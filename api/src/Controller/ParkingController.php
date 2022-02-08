<?php

namespace App\Controller;


use App\Entity\Parkings;
use App\Entity\Users;
use App\EventListener\JWTDecodedListener;
use App\Util\EncodeJSON;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ParkingController extends AbstractController
{
    private $doctrine;
    private $validator;
    public function __construct(ManagerRegistry $doctrine, ValidatorInterface $validator)
    {
        $this->doctrine = $doctrine;
        $this->validator = $validator;
    }

    /**
     * @Route("/api/parkings", name="parking", methods="GET")
     */
    public function getParkings(Request $request): Response
    {
        $entityManager = $this->doctrine->getManager();
        $parkings = $entityManager->getRepository(Parkings::class)->findAll();

        $data = [];
        foreach ($parkings as $parking) {
            $tempParking = EncodeJSON::EncodeParking($parking);
            $data[] = array_merge($tempParking, ["owner" => EncodeJSON::EncodeUser(($parking->getOwner()->first()), false, true)]);
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

        return $this->json($data);
    }
    /**
     * @Route("/api/parkings", name="setParking", methods="POST")
     */
    public function setParking(Request $request): Response
    {
        $data = $request->getContent();
        $entityManager = $this->doctrine->getManager();
        $parkingDecode = json_decode($data);
        $parking = EncodeJSON::DecodeParking($parkingDecode);

        $ownerMail = $parkingDecode->owner->mail;
        $owner = $entityManager->getRepository(Users::class)->findBy(["Mail" => $ownerMail], null, 1);
        if (!$owner) {
            return $this->json("No user found for mail: " . $parkingDecode->owner->mail, 404);
        }
        $parking->addOwner(reset($owner));

        $errors = $this->validator->validate($parking);
        if (count($errors) > 0) {
            return $this->json((string) $errors, 400);
        }

        $entityManager->persist($parking);
        $entityManager->flush();

        return new Response('Saved new parking with id '. $parking->getId());
    }

    /**
     * @Route("/api/parkings/{id}", name="updateParking", methods={"PUT"}, requirements={"id": "\d+"})
     */
    public function updateParking($id, Request $request): Response
    {
        $data = $request->getContent();
        $entityManager = $this->doctrine->getManager();
        $parking = $entityManager->getRepository(Parkings::class)->find($id);
        if (!$parking) {
            return $this->json("No parking found for id: $id", 404);
        }

        $this->denyAccessUnlessGranted("edit", $parking);

        $parkingDecode = json_decode($data);
        $updateParking = EncodeJSON::DecodeParking($parkingDecode, $parking, true);

        $errors = $this->validator->validate($updateParking);
        if (count($errors) > 0) {
            return $this->json((string) $errors, 400);
        }

        $entityManager->flush();
        return $this->json([
            'result' => "parking " .$updateParking->getId() . " updated"
        ]);
    }

    /**
     * @Route("/api/parkings/{id}", name="deleteParking", methods={"DELETE"}, requirements={"id": "\d+"})
     */
    public function deleteParking(int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
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
     * @Route("/api/parkings/{id}", name="getParkingById", methods={"GET"})
     */
    public function getParking(int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $parking = $entityManager->getRepository(Parkings::class)->find($id);

        if (!$parking) {
           return $this->json("No parking found for id: $id", 404);
        }

        $parking = EncodeJSON::EncodeParking($parking);

        return $this->json($parking);
    }
}
