<?php

namespace App\Controller;

use App\Entity\Coordinates;
use App\Entity\Parkings;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;

class ParkingController extends AbstractController
{
    /**
     * @Route("/parkings", name="parking")
     */
    public function getParkings(ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $parkings = $entityManager->getRepository(Parkings::class)->findAll();
        $data = [];
        $timesAvailableData = [];
        foreach ($parkings as $parking){
            foreach ($parking->getTimesAvailable() as $timeRange){
                $tmpTimes = [
                    "start" => $timeRange->getTimeRanges()[0],
                    "end" => $timeRange->getTimeRanges()[1]
                ];
                $timesAvailableData[] = $tmpTimes;
            }
            $tmp = [
                "id" => $parking->getId(),
                "coordinates" => ["latitude"=>$parking->getCoordinates()->getLatitude(), "longitude"=>$parking->getCoordinates()->getLongitude()],
                "direction" => $parking->getDirection(),
                "type" => $parking->getType(),
                "staus" => $parking->getStatus(),
                "timesAvailable" => $timesAvailableData,
                "daysAvailable" => $parking->getDatesAvailable(),
                "price_per_hour" => $parking->getPricePerHour(),
                "price_per_day" => $parking->getPricePerDay()
            ];
            $data[] = $tmp;
        }

        return $this->json([
            'parkings' => $data
        ]);
    }
}
