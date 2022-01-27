<?php

namespace App\Controller;

use App\Entity\Coordinates;
use App\Entity\Parkings;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ParkingController extends AbstractController
{
    /**
     * @Route("/parkings", name="parking", methods={"GET"})
     */
    public function getParkings(): Response
    {
        $parkings = $this->getDoctrine()->getRepository(Parkings::class)->findAll();
        $data = [];
        foreach ($parkings as $parking){
            $cords = [
                "latitude"=>$parking->getCoordinates()->getLatitude(),
                "longitude"=>$parking->getCoordinates()->getLongitude()
            ];
            $tmp = [
                "id" => $parking->getId(),
                "coordinates" => $cords,
                "direction" => $parking->getDirection(),
                "type" => $parking->getType(),
                "staus" => $parking->getStatus(),
                "price_per_hour" => $parking->getPricePerHour(),
                "price_per_day" => $parking->getPricePerDay()
            ];
            $data[] = $tmp;
        }

        return $this->json([
            'parkings' => $data
        ]);
    }
    /**
     * @Route("/parkings", name="setParking", methods={"POST"})
     */
    public function setParking(): Response
    {
//        $parkings = $this->getDoctrine()->getRepository(Parkings::class)->findAll();
//        $data = [];
//        foreach ($parkings as $parking){
//            $cords = [
//                "latitude"=>$parking->getCoordinates()->getLatitude(),
//                "longitude"=>$parking->getCoordinates()->getLongitude()
//            ];
//            $tmp = [
//                "id" => $parking->getId(),
//                "coordinates" => $cords,
//                "direction" => $parking->getDirection(),
//                "type" => $parking->getType(),
//                "staus" => $parking->getStatus(),
//                "price_per_hour" => $parking->getPricePerHour(),
//                "price_per_day" => $parking->getPricePerDay()
//            ];
//            $data[] = $tmp;
//        }
//
        return $this->json([
            'parkings' => "create"
        ]);
    }
}
