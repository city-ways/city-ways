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
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    private $doctrine;
    private $validator;
    // todo: refactor
    public function __construct(ManagerRegistry $doctrine, ValidatorInterface $validator)
    {
        $this->doctrine = $doctrine;
        $this->validator = $validator;
    }
    /**
     * @Route("/user/{id}", name="user", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function index(int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $user = $entityManager->getRepository(Users::class)->find($id);
        if (!$user) {
            return $this->json("No user found for id: $id", 404);
        }
        // return the full information of the user
        $data = EncodeJSON::EncodeUser($user);

        return $this->json($data);
    }

    /**
     * @Route("/user/{id}", name="updateUser", methods={"PUT"}, requirements={"id": "\d+"})
     */
    public function updateUser(int $id, Request $data): Response
    {
        // update user info, no password change
        $entityManager = $this->doctrine->getManager();
        $user = $entityManager->getRepository(Users::class)->find($id);
        if (!$user) {
            return $this->json("No user found for id: $id", 404);
        }
        $userDecode = json_decode($data);
        $updateUser = EncodeJSON::DecodeUser($userDecode, false, true, $user);

        $entityManager->flush();
        return $this->json([
            'result' => "User " .$updateUser->getId() . " updated"
        ]);

    }

    /**
     * @Route("/user/{id}", name="deleteUser", methods={"DELETE"}, requirements={"id": "\d+"})
     */
    public function deleteUser(int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $user = $entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return $this->json("No user found for id: $id", 404);
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return $this->json([
            'result' => "User " .$user->getId() . " updated"
        ]);
    }

}

