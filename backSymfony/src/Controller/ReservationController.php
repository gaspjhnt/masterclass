<?php

namespace App\Controller;

use App\Entity\Events;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Reservation;
use App\Entity\User;
use Ramsey\Uuid\Uuid;
use App\Service\PdfGenerator;
use App\Repository\EventRepository;


#[Route('/api/reservation')]
class ReservationController extends AbstractController
{
    #[Route('/', name: 'app_reservation')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $reservations = $entityManager->getRepository(Reservation::class)->findAll();

        $reservationData = array_map(function ($reservation) {
            return [
                'id' => $reservation->getId(),
                'nb_persons' => $reservation->getNbPersons(),
                'reservation_date' => $reservation->getReservationDate()->format('Y-m-d H:i:s'),
                'user' => [
                    'id' => $reservation->getUserId()->getId(),
                    'name' => $reservation->getUserId()->getPrenom() . ' ' . $reservation->getUserId()->getNom()
                ],
                'event' => [
                    'id' => $reservation->getEventId()->getId(),
                    'name' => $reservation->getEventId()->getName()
                ]
            ];
        }, $reservations);

        return $this->json($reservationData);
    }


    #[Route('/create', name: 'reservation_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
    
        $nbPersons = isset($data['nb_persons']) ? (int) $data['nb_persons'] : null;
        if (null === $nbPersons || $nbPersons <= 0) {
            return $this->json(['message' => 'Invalid number of persons'], Response::HTTP_BAD_REQUEST);
        }
    
        $userId = isset($data['user_id']) ? (int) $data['user_id'] : null   ;
        if (!$userId) {
            return $this->json(['message' => 'User ID is missing'], Response::HTTP_BAD_REQUEST);
        }
    
        $user = $entityManager->getRepository(User::class)->find($userId);
        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $eventId = isset($data['event_id']) ? (int) $data['event_id'] : null;
        if (!$eventId) {
            return $this->json(['message' => 'Event ID is missing'], Response::HTTP_BAD_REQUEST);
        }
    
        $event = $entityManager->getRepository(Events::class)->find($eventId);
        if (!$event) {
            return $this->json(['message' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }
    
        if ($event->getPlacesReserved() >= $event->getPlacesTotal()) {
            return $this->json(['message' => 'This event is fully booked'], Response::HTTP_BAD_REQUEST);
        }

        if ($event->getPlacesReserved() + $nbPersons >= $event->getPlacesTotal()) {
            return $this->json(['message'=> 'there isn\'t enough space in this event ' . $event->getPlacesTotal() - $event->getPlacesReserved() . ' place(s) left.'], Response::HTTP_BAD_REQUEST);
        }

        $today = new \DateTime();
        $age = $user->getDateanniv()->diff($today)->y; 

        if ($age < 18 && $event->isAdultOnly()) {
            return $this->json(['message' => 'This event is only reserved for adult persons'], Response::HTTP_BAD_REQUEST);
        }

        
        $event->setPlacesReserved($event->getPlacesReserved() + $nbPersons);
        $entityManager->persist($event);
        $uuid = Uuid::uuid4();
    
        $reservation = new Reservation();
        $reservation->setUuid($uuid);
        $reservation->setNbPersons($nbPersons);
        $reservation->setReservationDate($today);
        $reservation->setUserId($user);
        $reservation->setEventId($event);
    
        $entityManager->persist($reservation);
        $entityManager->flush();
    
        return $this->json([
            'message' => 'Reservation created successfully',
            'reservation_id' => $reservation->getId()
        ], Response::HTTP_CREATED);
    }
       

    #[Route('/{id}', name: 'reservation_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager, User $user): Response
    {
        $reservation = $entityManager->getRepository(Reservation::class)->find($id);

        if (!$reservation) {
            return $this->json(['message' => 'Reservation not found'], Response::HTTP_NOT_FOUND);
        }

        $data = [
            'id' => $reservation->getId(),
            'nb_persons' => $reservation->getNbPersons(),
            'reservation_date' => $reservation->getReservationDate()->format('Y-m-d H:i:s'),
            'user' => [
                'id' => $reservation->getUserId()->getId(),
                'name' => $reservation->getUserId()->getPrenom() . ' ' . $reservation->getUserId()->getNom()
            ],
            'event' => [
                'id' => $reservation->getEventId()->getId(),
                'name' => $reservation->getEventId()->getName()
            ]
        ];

        return $this->json($data);
    }


    #[Route('/update/{id}', name: 'reservation_update', methods: ['POST'])]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager): Response {
        $data = json_decode($request->getContent(), true);
        $reservation = $entityManager->getRepository(Reservation::class)->find($id);

        if (!$reservation) {
            return $this->json(['message' => 'Reservation not found'], Response::HTTP_NOT_FOUND);
        }

        $event = $reservation->getEventId();
        $startDate = $event->getStartDate();
        $today = new \DateTime();

        if ($startDate->diff($today)->days < 2) {
            return $this->json(['message' => 'Cannot change the reservation within 2 days of the event start date'], Response::HTTP_BAD_REQUEST);
        }

        $newNbPersons = isset($data['nb_persons']) ? (int) $data['nb_persons'] : $reservation->getNbPersons();
        if ($event->getPlacesTotal() < $event->getPlacesReserved() - $reservation->getNbPersons() + $newNbPersons) {
            return $this->json(['message' => 'Not enough places available for the selected event'], Response::HTTP_BAD_REQUEST);
        }

        $reservation->setNbPersons($newNbPersons);
        $reservation->setReservationDate($today);
        if (isset($data['event_id'])) {
            $newEvent = $entityManager->getRepository(Events::class)->find($data['event_id']);
            if (!$newEvent) {
                return $this->json(['message' => 'Event not found'], Response::HTTP_NOT_FOUND);
            }
                    
            if ($event->getPlacesReserved() >= $event->getPlacesTotal()) {
                return $this->json(['message' => 'This event is fully booked'], Response::HTTP_BAD_REQUEST);
            }

            if ($event->getPlacesReserved() + $newNbPersons >= $event->getPlacesTotal()) {
                return $this->json(['message'=> 'there isn\'t enough space in this event ' . $event->getPlacesTotal() - $event->getPlacesReserved() . ' place(s) left.'], Response::HTTP_BAD_REQUEST);
            }

            $today = new \DateTime();
            $age = $reservation->getUserId()->getDateanniv()->diff($today)->y; 

            if ($age < 18 && $event->isAdultOnly()) {
                return $this->json(['message' => 'This event is only reserved for adult persons'], Response::HTTP_BAD_REQUEST);
            }

            $reservation->setEventId($newEvent);
        }

        $entityManager->flush();
        return $this->json(['message' => 'Reservation updated successfully'], Response::HTTP_OK);
    }
    
    #[Route('/delete/{id}', name: 'reservation_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $entityManager): Response
    {
        $reservation = $entityManager->getRepository(Reservation::class)->find($id);

        $event = $reservation->getEventId();
        $startDate = $event->getStartDate();
        $today = new \DateTime();

        if ($startDate->diff($today)->days < 2) {
            return $this->json(['message' => 'Cannot delete the reservation within 2 days of the event start date'], Response::HTTP_BAD_REQUEST);
        }

        if (!$reservation) {
            return $this->json(['message' => 'Reservation not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($reservation);
        $entityManager->flush();

        return $this->json(['message' => 'Reservation deleted successfully'], Response::HTTP_OK);
    }

    #[Route('/pdf/{id}', name: 'app_event_generate_pdf', methods: ['GET'])]
    public function generatePdfAction(Request $request, PdfGenerator $pdfGenerator, int $id, EntityManagerInterface $entityManager): Response
    {
        $reservation = $entityManager->getRepository(Reservation::class)->find($id);

        $event = $entityManager->getRepository(Events::class)->find($reservation->getEventId());
        if (!$event) {
            throw $this->createNotFoundException('Event not found');
        }

        $eventName = $event->getName();
        $reservationDate = $reservation->getReservationDate()->format('Y-m-d');
        $eventDate = $event->getStartDate()->format('Y-m-d');
        $numberOfAttendees = $reservation->getNbPersons();
        $reservationUuid = $reservation->getUUID();

        $pdfContent = $pdfGenerator->generatePdf($eventName, $eventDate, $reservationDate, $numberOfAttendees, $reservationUuid);

        return new Response($pdfContent, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="reservation.pdf"'
        ]);

        return $this->json(['message' => 'Reservation deleted successfully'], Response::HTTP_OK);
    }
}
