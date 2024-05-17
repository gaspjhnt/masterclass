<?php
namespace App\Controller;

use App\Entity\Events;
use App\Form\EventsType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EventsController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/events', name: 'api_events_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $event = new Events();
        $form = $this->createForm(EventsType::class, $event);

        $data = json_decode($request->getContent(), true);
        $data['type'] = $data['type_id'];
        unset($data['type_id']);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $event = $form->getData();
            $this->entityManager->persist($event);
            $this->entityManager->flush();

            return $this->json(['message' => 'Événement créé avec succès'], Response::HTTP_CREATED);
        }

        return $this->json(['errors' => $form->getErrors(true)], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/api/events', name: 'api_events_read', methods: ['GET'])]
    public function read(): Response
    {
        $events = $this->entityManager->getRepository(Events::class)->findAll();

        $eventsData = array_map(function ($events) {
            return [
                'id' => $events->getId(),
                'name' => $events->getName(),
                'typeId' => $events->getType()->getId(),
                'startDate' => $events->getStartDate()->format('Y-m-d H:i:s'),
                'endDate' => $events->getEndDate()->format('Y-m-d H:i:s'),
                'image' => $events->getImage(),
                'placesTotal' => $events->getPlacesTotal(),
                'placesReserved' => $events->getPlacesReserved(),
                'adultOnly' => $events->isAdultOnly(),
                'canceled' => $events->isCanceled(),
                'canceledMessage' => $events->getCanceledMessage(),
                'description' => $events->getDescription()
            ];
        }, $events);

        return $this->json(['events' => $eventsData], Response::HTTP_OK);
    }

    #[Route('/api/events/{id}', name: 'api_events_read_one', methods: ['GET'])]
    public function readOne($id): Response
    {
        $event = $this->entityManager->getRepository(Events::class)->find($id);
        if (!$event) {
            return $this->json(['message' => 'Événement introuvable'], Response::HTTP_NOT_FOUND);
        }

        $eventData = [
                'id' => $event->getId(),
                'name' => $event->getName(),
                'typeId' => $event->getType()->getId(),
                'startDate' => $event->getStartDate()->format('Y-m-d H:i:s'),
                'endDate' => $event->getEndDate()->format('Y-m-d H:i:s'),
                'image' => $event->getImage(),
                'placesTotal' => $event->getPlacesTotal(),
                'placesReserved' => $event->getPlacesReserved(),
                'adultOnly' => $event->isAdultOnly(),
                'canceled' => $event->isCanceled(),
                'canceledMessage' => $event->getCanceledMessage(),
                'description' => $event->getDescription()
            ];

        return $this->json(['events' => $eventData], Response::HTTP_OK);
    }

    #[Route('/api/events/{id}', name: 'api_events_update', methods: ['PUT'])]
    public function update(Request $request, $id): Response
    {
        $event = $this->entityManager->getRepository(Events::class)->find($id);
        if (!$event) {
            return $this->json(['message' => 'Événement introuvable'], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(EventsType::class, $event);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $event = $form->getData();
            $this->entityManager->persist($event);
            $this->entityManager->flush();

            return $this->json(['message' => 'Événement mis à jour avec succès']);
        }

        return $this->json(['errors' => $form->getErrors(true)], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/api/events/{id}', name: 'api_events_delete', methods: ['DELETE'])]
    public function delete($id): Response
    {
        $event = $this->entityManager->getRepository(Events::class)->find($id);
        if (!$event) {
            return $this->json(['message' => 'Événement introuvable'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($event);
        $this->entityManager->flush();

        return $this->json(['message' => 'L\'événement a bien été supprimé']);
    }

    public function addition($a, $b)
    {
        return $a + $b;
    }
}
