<?php

namespace App\Controller;


use App\Entity\Coordinates;
use App\Entity\DatesAvailable;
use App\Entity\Parkings;
use App\Entity\TimesAvailable;
use App\Util\EncodeJSON;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ParkingController extends AbstractController
{
    /**
     * @Route("/parkings", name="parking", methods="GET")
     */
    public function getParkings(ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $parkings = $entityManager->getRepository(Parkings::class)->findAll();

        $data = [];
        foreach ($parkings as $parking){
            $data[] = EncodeJSON::EncodeParking($parking);
        }

        return $this->json([
            'parkings' => $data
        ]);
    }
    /**
     * @Route("/parkings", name="setParking", methods="POST")
     */
    public function setParking(Request $request, ManagerRegistry $doctrine, ValidatorInterface $validator): Response
    {
        $data = $request->getContent();
        $entityManager = $doctrine->getManager();

        $parking = EncodeJSON::DecodeParking($data);

        $errors = $validator->validate($parking);
        if (count($errors) > 0) {
            return new Response((string) $errors, 400);
        }

        $entityManager->persist($parking);
        $entityManager->flush();

        return new Response('Saved new parking with id '. $parking->getId());
    }

    /**
     * @Route("/parkings/{id}", name="updateParking", methods={"PUT"}, requirements={"id": "\d+"})
     */
    public function updateParking($id, Request $request, ManagerRegistry $doctrine, ValidatorInterface $validator): Response
    {
        $data = $request->getContent();
        $entityManager = $doctrine->getManager();
        $parking = $entityManager->getRepository(Parkings::class)->find($id);

        if (!$parking) {
            return $this->json("No parking found for id: $id", 404);
        }

        $updateParking = EncodeJSON::DecodeParking($data, $parking, true);

        $errors = $validator->validate($updateParking);
        if (count($errors) > 0) {
            return $this->json((string) $errors, 400);
        }

        $entityManager->flush();
        return $this->json([
            'result' => "parking " .$updateParking->getId() . " updated"
        ]);
    }

    /**
     * @Route("/parkings/{id}", name="deleteParking", methods={"DELETE"}, requirements={"id": "\d+"})
     */
    public function deleteParking(int $id, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $parking = $entityManager->getRepository(Parkings::class)->find($id);

        if (!$parking) {
            return $this->json("No parking found for id: $id", 404);
        }

        $entityManager->remove($parking);
        $entityManager->flush();

        return $this->json([
            'result' => "parking " .$parking->getId() . " updated"
        ]);
    }
    /**
     * @Route("/parkings/{id}", name="getParkingById", methods={"GET"})
     */
    public function getParking(int $id, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $parking = $entityManager->getRepository(Parkings::class)->find($id);

        if (!$parking) {
           return $this->json("No parking found for id: $id", 404);
        }

        $parking = EncodeJSON::EncodeParking($parking);

        return $this->json($parking);
    }
}
