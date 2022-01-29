<?php

namespace App\Controller;


use App\Entity\Coordinates;
use App\Entity\DatesAvailable;
use App\Entity\Parkings;
use App\Entity\TimesAvailable;
use App\Entity\Users;
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
    public function getParkings(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
        $parkings = $entityManager->getRepository(Parkings::class)->findAll();

        $data = [];
        foreach ($parkings as $parking) {
            $tempParking = EncodeJSON::EncodeParking($parking);
            $data[] = array_push($tempParking, ["owner", EncodeJSON::EncodeUser($parking->getOwner(), false)]);
        }

        // filter parkings by status
        // Ex: /parkings?status=false
        $status = $request->query->get('status');
        if ($status) {
            $status = $status === 'true';
            $data = array_values(array_filter($data, function ($parking) use ($status) {
                $filterParking = null;
                if ($parking['status'] === $status) {
                    $filterParking = $parking;
                }
                return $filterParking;
            }));
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
        $parkingDecode = json_decode($data);
        $parking = EncodeJSON::DecodeParking($parkingDecode);

        $ownerMail = $parkingDecode->owner->mail;
        $owner = $entityManager->getRepository(Users::class)->findBy(["Mail" => $ownerMail]);
        $parking->addOwner($owner["0"]);
//        $parking->addOwner(EncodeJSON::DecodeUser($data->owner));
        $errors = $validator->validate($parking);
        if (count($errors) > 0) {
            return $this->json((string) $errors, 400);
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
