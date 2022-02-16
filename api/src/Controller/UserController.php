<?php

namespace App\Controller;

use App\Entity\Users;
use App\Util\EncodeJSON;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    private $doctrine;
    private $validator;
    public function __construct(ManagerRegistry $doctrine, ValidatorInterface $validator)
    {
        $this->doctrine = $doctrine;
        $this->validator = $validator;
    }
    /**
     * @Route("/api/user/{id}", name="user", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function index(int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $user = $entityManager->getRepository(Users::class)->find($id);
        if (!$user) {
            return $this->json("No user found for id: $id", 404);
        }
        // return sensitive information about the user, only the user can see their information.
        $this->denyAccessUnlessGranted("view", $user);
        // return the full information of the user
        $data = EncodeJSON::EncodeUser($user);

        return $this->json($data);
    }

    /**
     * @Route("/api/users", name="users", methods={"GET"})
     */
    public function allUsers(): Response
    {
        $this->denyAccessUnlessGranted("ROLE_SUPER_ADMIN");
        $entityManager = $this->doctrine->getManager();
        $users = $entityManager->getRepository(Users::class)->findAll();
        if (!$users) {
            return $this->json("No user found", 404);
        }
        // return sensitive information about the user, only the user can see their information.
//        $this->denyAccessUnlessGranted("view", $user);
        // return the full information of the user
        $data = [];
        foreach ($users as $user) {
            $data[] = EncodeJSON::EncodeUser($user);
        }

        return $this->json($data);
    }

    /**
     * @Route("/api/user", name="userid", methods={"GET"})
     * get method can't have body, so the mail is passed by a query
     */
    public function getIdOfUser(Request $request): Response
    {
//        $mail = $request->query->get('mail');
//        $mail =
//        $entityManager = $this->doctrine->getManager();
//        $user = $entityManager->getRepository(Users::class)->findOneByMail($mail);
//        if (!$user) {
//            return $this->json("No user found for mail: $mail", 404);
//        }

        $user = $this->getUser();
        if (!$user) {
            return $this->json("No user found", 404);
        }

        // return the full information of the user
        $data = EncodeJSON::EncodeUser($user, true, false);

        return $this->json($data);
    }


    /**
     * @Route("/api/user/{id}", name="updateUser", methods={"PUT"}, requirements={"id": "\d+"})
     */
    public function updateUser(int $id, Request $request): Response
    {
        $data = $request->getContent();

        // update user info, no password change
        $entityManager = $this->doctrine->getManager();
        $user = $entityManager->getRepository(Users::class)->find($id);
        if (!$user) {
            return $this->json("No user found for id: $id", 404);
        }
        $this->denyAccessUnlessGranted("edit", $user);

        $userDecode = json_decode($data);
        $updateUser = EncodeJSON::DecodeUser($userDecode, false, true, $user);
        $errors = $this->validator->validate($updateUser);

        if (count($errors) > 0) {
            return $this->json((string) $errors, 400);
        }

        $entityManager->flush();
        return $this->json([
            'result' => "User " .$updateUser->getId() . " updated"
        ]);

    }

    /**
     * @Route("/api/user/{id}", name="deleteUser", methods={"DELETE"}, requirements={"id": "\d+"})
     */
    public function deleteUser(int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $user = $entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return $this->json("No user found for id: $id", 404);
        }
        $this->denyAccessUnlessGranted("edit", $user);

        $entityManager->remove($user);
        $entityManager->flush();

        return $this->json([
            'result' => "User " .$user->getId() . " updated"
        ]);
    }

}

