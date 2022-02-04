<?php

namespace App\Controller;
use App\Entity\History;
use App\Entity\Parkings;
use App\Entity\Users;
use App\Util\EncodeJSON;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class HistoryController extends AbstractController
{
    private $doctrine;
    private  $validator;
    public function __construct(ManagerRegistry $doctrine, ValidatorInterface $validator)
    {
        $this->doctrine = $doctrine;
        $this->validator = $validator;
    }
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
        $data = EncodeJSON::EncodeUserHistory($user->getHistory());
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
        $data = EncodeJSON::EncodeParkingHistory($parking->getHistory(), $parking);
        return $this->json($data);
    }
}
