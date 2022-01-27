<?php

namespace App\Controller;

use App\Entity\Coordinates;
use App\Entity\Parkings;
use App\Entity\TimesAvailable;
use App\Util\EncodeJSON;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ParkingController extends AbstractController
{
    // todo: refactorizar con Querying for Objects: The Repository en
    // https://symfony.com/doc/current/doctrine.html#querying-for-objects-the-repository
    /**
     * @Route("/parkings", name="parking", methods={"GET"})
     */
    public function getParkings(ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $parkings = $entityManager->getRepository(Parkings::class)->findAll();
        $data = [];
        $timesAvailableData = [];
        foreach ($parkings as $parking){
            $data[] = EncodeJSON::EncodeParking($parking);
        }

        return $this->json([
            'parkings' => $data
        ]);
    }
    /**
     * @Route("/parkings", name="setParking", methods={"POST"})
     */
    public function setParking(Request $request, ManagerRegistry $doctrine): Response
    {
        $data = $request->getContent();
        $content = json_decode($data);
        $parking_stdClass = $content->parking;

        $entityManager = $doctrine->getManager();
        return $this->json([
            'parkings' => "create"
        ]);
    }

    /**
     * @Route("/parkings", name="updateParking", methods={"PUT"})
     */
    public function updateParking(): Response
    {
        return $this->json([
            'parkings' => "create"
        ]);
    }

    /**
     * @Route("/parkings", name="deleteParking", methods={"DELETE"})
     */
    public function deleteParking(): Response
    {
        return $this->json([
            'parkings' => "create"
        ]);
    }
    /**
     * @Route("/parkings/{id}", name="setParking", methods={"GET"})
     */
    public function getParking($id): Response
    {
        $parking = $this->getDoctrine()->getRepository(Parkings::class)->find($id);
        $cords = [
            "latitude"=>$parking->getCoordinates()->getLatitude(),
            "longitude"=>$parking->getCoordinates()->getLongitude()
        ];
        $date = [
            "id" => $parking->getId(),
            "coordinates" => $cords,
            "direction" => $parking->getDirection(),
            "type" => $parking->getType(),
            "staus" => $parking->getStatus(),
            "price_per_hour" => $parking->getPricePerHour(),
            "price_per_day" => $parking->getPricePerDay()
        ];
        return $this->json([
            'parking' => $date
        ]);
    }
}
