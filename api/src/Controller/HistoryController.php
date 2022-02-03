<?php

namespace App\Controller;
use App\Entity\History;
use App\Util\EncodeJSON;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HistoryController extends AbstractController
{
    /**
     * @Route("/history/{id}", name="history")
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
}
