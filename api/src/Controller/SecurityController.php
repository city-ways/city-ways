<?php

namespace App\Controller;

use App\Entity\Users;
use App\Util\EncodeJSON;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/register", name="register", methods="post")
     */
    public function register(Request $request, ManagerRegistry $doctrine, ValidatorInterface $validator, UserPasswordHasherInterface  $passwordHasher)
    {
        $entityManager = $doctrine->getManager();

        $data = $request->getContent();
        $content = json_decode($data);

        $newUser = EncodeJSON::DecodeUser($content, null);
        // todo: think a better way to do it the same, ($passwordHasher)
        $hashedPassword = $passwordHasher->hashPassword($newUser, $newUser->getPassword());
        $newUser->setPassword($hashedPassword);
        $errors = $validator->validate($newUser);
        if (count($errors) > 0) {
            return $this->json((string) $errors, 400);
        }

        $entityManager->persist($newUser);
        $entityManager->flush();

        return new Response(sprintf('User %s successfully created', $newUser->getUsername()));
    }

}
