<?php
namespace App\Controller;

use App\Entity\Type;
use App\Form\TypeType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TypeController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/type', name: 'api_type_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $type = new Type();
        $form = $this->createForm(TypeType::class, $type);

        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $type = $form->getData();
            $this->entityManager->persist($type);
            $this->entityManager->flush();

            return $this->json(['message' => 'Le type d\'événement a bien été créé'], Response::HTTP_CREATED);
        }

        return $this->json(['errors' => $form->getErrors(true)], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/api/type', name: 'api_type_read', methods: ['GET'])]
    public function read(): Response
    {
        $types = $this->entityManager->getRepository(Type::class)->findAll();

        $typesData = array_map(function ($types) {
            return [
                'id' => $types->getId(),
                'name' => $types->getName()
            ];
        }, $types);

        return $this->json(['types' => $typesData], Response::HTTP_OK);
    }

    #[Route('/api/type/{id}', name: 'api_type_update', methods: ['PUT'])]
    public function update(Request $request, $id): Response
    {
        $type = $this->entityManager->getRepository(Type::class)->find($id);
        $form = $this->createForm(TypeType::class, $type);

        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $type = $form->getData();
            $this->entityManager->persist($type);
            $this->entityManager->flush();

            return $this->json(['message' => 'Le type d\'événement a bien été modifié']);
        }

        return $this->json(['errors' => $form->getErrors(true)], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/api/type/{id}', name: 'api_type_delete', methods: ['DELETE'])]
    public function delete($id): Response
    {
        $type = $this->entityManager->getRepository(Type::class)->find($id);
        $this->entityManager->remove($type);
        $this->entityManager->flush();

        return $this->json(['message' => 'Le type d\'événement a bien été supprimé']);
    }
}
