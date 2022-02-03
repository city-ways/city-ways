<?php

namespace App\Util;

use App\Entity\Coordinates;
use App\Entity\DatesAvailable;
use App\Entity\Parkings;
use App\Entity\TimesAvailable;
use App\Entity\Users;

class EncodeJSON
{

    public static function EncodeParking (Parkings $parking): array
    {

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

    public static function EncodeUser (Users $user, bool $withParkings = true, bool $basicUser = false): array {
        $userEncode = [
            "id" => $user->getId(),
            "mail" => $user->getMail(),
            "username" => $user->getName(),
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

}