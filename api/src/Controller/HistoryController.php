<?php

namespace App\Controller;
use App\Entity\History;
use App\Entity\Parkings;
use App\Entity\Users;
use App\Util\EncodeJSON;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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
     * @Route("/api/history", name="userHistory", methods={"GET"})
     */
    public function userHistory(): Response
    {
        $entityManager = $this->doctrine->getManager();
        $user = $this->getUser();
//        $user = $entityManager->getRepository(Users::class)->find($userId);
        if (!$user) {
            return $this->json("No user found for id", 404);
        }
        $data = EncodeJSON::EncodeUserHistory($user->getHistory());
        return $this->json($data);
    }
    /**
     * @Route("/api/history/parking/{parkingId}", name="parkingHistory", methods={"GET"}, requirements={"parkingId": "\d+"})
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
    /**
     * @Route("/api/history", name="createHistory", methods="POST")
     */
    public function createHistory(Request $request){
        $data = $request->getContent();
        $entityManager = $this->doctrine->getManager();
        $historyDecode = json_decode($data);
        $history = EncodeJSON::DecodeHistory($historyDecode);

        $userMail = $historyDecode->user->mail;
        $user = $entityManager->getRepository(Users::class)->findBy(["Mail" => $userMail], null, 1);
        if (!$user){
            return $this->json("No user found for mail: " . $historyDecode->user->mail, 404);
        }
        $history->setClientUser(reset($user));

        $parkingId = $historyDecode->parking->id;
        $parking = $entityManager->getRepository(Parkings::class)->findBy(["id" => $parkingId], null, 1);
        if (!$parking){
            return $this->json("No parking found for id: " . $historyDecode->parking->id, 404);
        }
        $history->setParking(reset($parking));

        $entityManager->persist($history);
        $entityManager->flush();

        return new Response('Saved new history with id '. $history->getId());
    }
}
