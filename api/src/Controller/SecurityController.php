<?php

namespace App\Controller;

use App\Entity\Users;
use App\Util\EncodeJSON;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\User;

class SecurityController extends AbstractController
{
    /**
     * @Route("/register", name="register", methods="post")
     */
    public function register(Request $request, PasswordHasherInterface $encoder, ManagerRegistry $doctrine)
    {
        $entityManager = $doctrine->getManager();
        // IMP! To get JSON format from POST method
        $data = $request->getContent();
        $content = json_decode($data);
        $user = EncodeJSON::DecodeUser($content);
        $mail = $content->mail;
        $name = $content->name;
        $dni = $content->dni;
        $password = $content->password;

        $user = new Users();
        $user->setMail($mail);
        $user->setName($name);
        $user->setDni($dni);
        $user->setPassword($encoder->encodePassword($user, $password));

        $entityManager->persist($user);
        $entityManager->flush();

        return new Response(sprintf('User %s successfully created', $user->getUsername()));
    }

}
