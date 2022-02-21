<?php

namespace App\Util;

use App\Entity\Coordinates;
use App\Entity\DatesAvailable;
use App\Entity\History;
use App\Entity\Parkings;
use App\Entity\TimesAvailable;
use App\Entity\Users;

class EncodeJSON
{

    public static function EncodeParking ($parking): array
    {
        // handel if a parking is deleted and a user access to their history
        if ($parking === '') {
            return array('Este parking no se encuentra disponible');
        }
        $timesAvailableData = [];
        $datesAvailableData = [];
        foreach ($parking->getTimesAvailable() as $timeRange) {
            $tmpTimes = [
                "start" => $timeRange->getTimeRanges()[0],
                "end" => $timeRange->getTimeRanges()[1]
            ];
            $timesAvailableData[] = $tmpTimes;
        }
        foreach ($parking->getDatesAvailable() as $dateRange) {
            $tmpDates = [
                "start" => $dateRange->getDates()[0],
                "end" => $dateRange->getDates()[1]
            ];
            $datesAvailableData[] = $tmpDates;
        }

        return [
            "id" => $parking->getId(),
            "direction" => $parking->getDirection(),
            "cords" => ["longitude" => (float)$parking->getCoordinates()->getLongitude(), "latitude" => (float)$parking->getCoordinates()->getLatitude()],
            "status" => $parking->getStatus(),
            "type" => $parking->getType(),
            "timesAvailable" => $timesAvailableData,
            "daysAvailable" => $datesAvailableData,
            "pricePerHour" => (float)$parking->getPricePerHour(),
            "pricePerDay" => (float)$parking->getPricePerDay(),
            "owner" => self::EncodeUser($parking->getOwner()->first(), false, true)
        ];


    }

    public static function DecodeParking (object $parkingJSON, Parkings $updateParking = null, bool $updateMode = false): Parkings {
        $parking_stdClass = $parkingJSON;

        $parking = $updateMode ? $updateParking : new Parkings();

        $parking->setDirection($parking_stdClass->direction);

        $cords = new Coordinates();
        $cords->setLongitude($parking_stdClass->cords->longitude);
        $cords->setLatitude($parking_stdClass->cords->latitude);

        $parking->setCoordinates($cords);

        $parking->setStatus((bool) $parking_stdClass->status);
        $parking->setType($parking_stdClass->type);

        $times = $parking->getTimesAvailable();
        foreach ($times as $time) {
            $parking->getTimesAvailable()->removeElement($time);
        }
        foreach ($parking_stdClass->timesAvailable as $timeRange) {
            $timesAvailable = new TimesAvailable();
            $timesAvailable->setTimeRanges(array($timeRange->start, $timeRange->end));
            $parking->addTimesAvailable($timesAvailable);
        }

        $dates = $parking->getDatesAvailable();
        foreach ($dates as $date) {
            $parking->getDatesAvailable()->removeElement($date);
        }
        foreach ($parking_stdClass->daysAvailable as $DayRange) {
            $datesAvailable = new DatesAvailable();
            $datesAvailable->setDates(array($DayRange->start, $DayRange->end));
            $parking->addDatesAvailable($datesAvailable);
        }

        $parking->setPricePerHour($parking_stdClass->pricePerHour);
        $parking->setPricePerDay($parking_stdClass->pricePerDay);

        return $parking;
    }

    public static function EncodeUser ($user, bool $withParkings = true, bool $basicUser = false): array {
        // handel if a user is deleted and another user access to their parking history
        if ($user === '') {
            return array('Este usuario ya no se encuentra');
        }
        $userEncode = [
            "id" => $user->getId(),
            "mail" => $user->getMail(),
            "name" => $user->getName(),
        ];

        if (!$basicUser) {
           $userEncode = array_merge($userEncode, ["dni" => $user->getDni()]);
        }

        if ($withParkings) {
            $parkings = [];
            foreach ($user->getOwns() as $parkingOwner) {
                $parkings[] = self::EncodeParking($parkingOwner);
            }
            $userEncode = array_merge($userEncode, ["owns" => $parkings]);
        }

        return $userEncode;
    }

    public static function DecodeUser ($userJSON, $withPassword = true, bool $updateMode = false, Users $updateUser = null): Users {
        $user = $updateMode ? $updateUser : new Users();
        $user_stdClass = $userJSON;

        $user->setName($user_stdClass->name);
        $user->setDni($user_stdClass->dni ?? "");
        if ($withPassword) {
            $user->setPassword($user_stdClass->password);
        }
        $user->setMail($user_stdClass->mail);

        return $user;
    }

    // Returns an encoded JSON array of all parkings used by a given user Id
    // return $history is an array of objects of type History
    public static function EncodeUserHistory($history): array {
        $userHistoryEncode = [];
        foreach ($history as $historyItem){
            $tmpHistoryItem = [
                "id" => $historyItem->getId(),
                "price" => $historyItem->getPrice(),
                "date" => $historyItem->getDate(),
                "parking" => self::EncodeParking($historyItem->getParking() ?? '')
            ];
            $userHistoryEncode[] = $tmpHistoryItem;
        }
        return $userHistoryEncode;
    }

    // Returns an encoded JSON array of all users that had used by a given parking id
    // Params: $history is an array of objects of type History
    public static function EncodeParkingHistory($history, Parkings $parking) : array {
        $parkingHistoryEncode = [];
        $total = 0;
        foreach ($history as $historyItem){
            $total += $historyItem->getPrice();
            $tmpHistoryItem = [
                "id" => $historyItem->getId(),
                "price" => $historyItem->getPrice(),
                "date" => $historyItem->getDate(),
                "user" => self::EncodeUser($historyItem->getClientUser() ?? '')
            ];
            $parkingHistoryEncode[] = $tmpHistoryItem;
        }
        return [
            "parking" => self::EncodeParking($parking),
            "uses" => $parkingHistoryEncode,
            "totalEarned" => $total
        ];
    }

    public static function DecodeHistory($historyJSON): History{
        $history = new History();
        $history_stdClass = $historyJSON;

        $history->setDate($history_stdClass->date);
        $history->setPrice($history_stdClass->price);

        return $history;
    }
}