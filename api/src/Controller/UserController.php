<?php

namespace App\Controller;

use App\Entity\Users;
use App\Util\EncodeJSON;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/user/{id}", name="user", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function index(int $id, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $user = $entityManager->getRepository(Users::class)->find($id);
        if (!$user) {
            return $this->json("No user found for id: $id", 404);
        }

        $data = EncodeJSON::EncodeUser($user);

        return $this->json($data);
    }

    /**
     * @Route("/user/{id}", name="updateUser", methods={"PUT"}, requirements={"id": "\d+"})
     */
    public function updateUser(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/UserController.php',
        ]);
    }

    /**
     * @Route("/user/{id}", name="deleteUser", methods={"DELETE"}, requirements={"id": "\d+"})
     */
    public function deleteUser(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/UserController.php',
        ]);
    }

    /**
     * @Route("/user", name="addUser", methods={"POST"})
     */
    public function addUser(Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher): Response
    {
        $entityManager = $doctrine->getManager();
        $data = $request->getContent();
        $content = json_decode($data);

        $mail = $content->mail;
        $name = $content->name;
        $dni = $content->dni;
        $password = $content->password;

        $user = new Users();
        $user->setMail($mail);
        $user->setName($name);
        $user->setDni($dni);
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );
        $user->setPassword($hashedPassword);


        $entityManager->persist($user);
        $entityManager->flush();
        return new Response(sprintf('User %s successfully created', $user->getUsername()));
    }
}

