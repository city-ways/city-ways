<?php

namespace App\Controller;
use App\Entity\History;
use App\Entity\Parkings;
use App\Util\EncodeJSON;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HistoryController extends AbstractController
{
    /**
     * @Route("/history/{userId}", name="history")
     */
    public function userHistory(int $userId): Response
    {
        $entityManager = $this->doctrine->getManager();
        $user = $entityManager->getRepository(Users::class)->find($userId);
        if (!$user) {
            return $this->json("No user found for id: $userId", 404);
        }
        $history = $entityManager->getRepository(History::class)->find($user);
        if (!$history) {
            return $this->json("No user history found for user id: $userId", 404);
        }
        $data = EncodeJSON::EncodeUserHistory($history);
        return $this->json($data);
    }
    /**
     * @Route("/history/parking/{parkingId}", name="history")
     */
    public function parkingHistory(int $parkingId): Response
    {
        $entityManager = $this->doctrine->getManager();
        $parking = $entityManager->getRepository(Parkings::class)->find($parkingId);
        if (!$parking) {
            return $this->json("No parking found for id: $parkingId", 404);
        }
        $history = $entityManager->getRepository(History::class)->find($parking);
        if (!$history) {
            return $this->json("No parking history found for user id: $parkingId", 404);
        }
        $data = EncodeJSON::EncodeParkingHistory($history);
        return $this->json($data);
    }
}
