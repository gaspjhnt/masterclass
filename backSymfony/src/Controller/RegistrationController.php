<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\LoginType;
use App\Form\RegistrationType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegistrationController extends AbstractController
{
         
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }


    #[Route('/inscription', name: 'app_registration',methods:['POST'])]
    public function index(Request $request, UserPasswordHasherInterface $encoder, EntityManagerInterface $entityManager): Response
    {
       
        $user = new User();
        $form = $this->createForm(RegistrationType::class, $user);

        $data= json_decode($request->getContent(), true);
       
          
            $user_find = $this->entityManager->getRepository(User::class)->findOneByEmail($data['email']);

            if (!$user_find) {
                // Hasher le mot de passe
                $password = $encoder->hashPassword($user, $data['password']);
                $user->setEmail($data['email']);
                $user->setNom($data['nom']);
                $user->setPrenom($data['prenom']);
                $user->setDateanniv(new \DateTime());
                $user->setRoles(['ROLE_USER']);
                $user->setPassword($password);
                $this->entityManager->persist($user);
                $this->entityManager->flush();

        }
        return $this->json([
            'message' => 'user created successfully',
            'user_id' => $user->getId(),

        ], Response::HTTP_CREATED);
    }


    #[Route('/user/{id}', name: 'app_user_details', methods: ['GET'])]
    public function getUserDetails(   Request $request,int $id ,EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer l'utilisateur par son ID depuis la base de données
        $user = $this->entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            // Retourner une réponse JSON avec un message d'erreur si l'utilisateur n'est pas trouvé
            return new JsonResponse(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // Retourner une réponse JSON avec les détails de l'utilisateur
        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'dateanniv' => $user->getDateanniv()->format('Y-m-d'), // Format de date
            'roles' => $user->getRoles(),
        ]);
    }
    #[Route('/users', name: 'app_get_all_users', methods: ['GET'])]
    public function getAllUsers(): JsonResponse
    {
        // Récupérer tous les utilisateurs depuis la base de données
        $userRepository = $this->entityManager->getRepository(User::class);
        $users = $userRepository->findAll();

        // Construire un tableau contenant les détails de chaque utilisateur
        $usersData = [];
        foreach ($users as $user) {
            $usersData[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'dateanniv' => $user->getDateanniv()->format('Y-m-d'), // Format de date
                'roles' => $user->getRoles(),
            ];
        }

        // Retourner une réponse JSON avec tous les utilisateurs
        return new JsonResponse($usersData);
    }

    #[Route('/connexion', name: 'app_connexion', methods:['POST'])]

    public function login(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $user = new User();
        $form = $this->createForm(LoginType::class, $user);
        $data = json_decode($request->getContent(), true);
        
        // Manuellement soumettre les données JSON au formulaire
        $form->submit($data);

            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);

            if (!$user) {
                return new JsonResponse(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
            }

            if (!$passwordHasher->isPasswordValid($user, $data['password'])) {
                return new JsonResponse(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
            }

            return new JsonResponse([
                'message' => 'Login successful',
                
               
            ], Response::HTTP_OK);
        

        return new JsonResponse(['message' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
    }
}





    




