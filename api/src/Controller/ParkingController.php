<?php

namespace App\Controller;


use App\Entity\History;
use App\Entity\Parkings;
use App\Entity\Users;
use App\Util\EncodeJSON;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ParkingController extends AbstractController
{
    private $doctrine;
    private $validator;
    private $client;
    public function __construct(ManagerRegistry $doctrine, ValidatorInterface $validator, HttpClientInterface $client)
    {
        $this->doctrine = $doctrine;
        $this->validator = $validator;
        $this->client = $client;
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
     * @throws TransportExceptionInterface
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

        $longitude = $parking->getCoordinates()->getLongitude();
        $latitude = $parking->getCoordinates()->getLatitude();

        // add the name of the street based on the coords
        $response = $this->client->request("GET", "https://api.mapbox.com/geocoding/v5/mapbox.places/$longitude,$latitude.json", [
            'query' => [
                'access_token' => $this->getParameter('map_box_token'),
                'limit' => '1',
                'types' => 'address',
                'language' => 'es'
            ]
        ]);
        try {
            $content = $response->toArray();
        } catch (ClientExceptionInterface
        |RedirectionExceptionInterface
        |TransportExceptionInterface
        |ServerExceptionInterface
        |DecodingExceptionInterface $e) {
            return $this->json( $e->getMessage(), $e->getCode());
        }

        $parking->setDirection(preg_split('/[,]+/', $content['features'][0]['place_name_es'])[0]);


        $errors = $this->validator->validate($parking);
        if (count($errors) > 0) {
            return $this->json((string) $errors, 400);
        }

        $entityManager->persist($parking);
        $entityManager->flush();

        return $this->json('Saved new parking with id '. $parking->getId());
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
        $this->denyAccessUnlessGranted("edit", $parking);
        if ($parking->getStatus()) {
            return $this->json("El parking esta en uso", 400);
        }
        $entityManager->remove($parking);
        $entityManager->flush();

        return $this->json([
            'result' => "parking " .$parking->getId() . " updated"
        ]);
    }

    /**
     * @Route("/api/parkings/{id}", name="getParkingById", methods={"GET"}, requirements={"id": "\d+"})
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

    /**
     * @Route("/api/parkings/{id}/book", name="bookParking", methods={"PUT"}, requirements={"id": "\d+"})
     */
    public function bookParking(int $id, Request $request): Response
    {
        $entityManager = $this->doctrine->getManager();
        $parking = $entityManager->getRepository(Parkings::class)->find($id);

        if (!$parking) {
            return $this->json("No parking found for id: $id", 404);
        }
        // only the user can book a parking if the user aren't already booking one.
        // $this->denyAccessUnlessGranted("book", $parking, "no puedes ocupar mas de un parking a la vez");
        // prevent to throw 403
        if (!$this->isGranted("book", $parking)) {
            return $this->json("No puedes ocupar mas de un parking a la vez o estas reservando un parking en uso");
        }
        // user can book this parking
        $parking->setStatus(!$parking->getStatus());
        // when the parking is release, is added to the history
        // false == free, true == a user is using that parking
        // when the user take the parking, history is added
        if ($parking->getStatus()) {
            $message = "Estas usando el parking: " . $parking->getDirection();
            $currentDate = new DateTime();
            $strDate = $currentDate->format('Y-m-d');
            $parking->addHistory(new History($strDate, $this->getUser(), $parking));
        } else {
            $message = "Has dejado de usar el parking: " . $parking->getDirection();
            /** @var History $history */
            $history = $parking->getHistory()->last();
            $history->setInProgress(false);
        }
        $errors = $this->validator->validate($parking);
        if (count($errors) > 0) {
            return $this->json((string) $errors, 400);
        }
        $entityManager->flush();
        return $this->json($message);
    }
}
