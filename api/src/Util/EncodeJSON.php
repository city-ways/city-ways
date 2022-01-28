<?php

namespace App\Util;

use App\Entity\Coordinates;
use App\Entity\DatesAvailable;
use App\Entity\Parkings;
use App\Entity\TimesAvailable;

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
            "pricePerDay" => (float)$parking->getPricePerDay()
        ];


    }

    public static function DecodeParking (string $parkingJSON, Parkings $updateParking = null, bool $updateMode = false): Parkings {
        $content = json_decode($parkingJSON);
        $parking_stdClass = $content;

        $parking = $updateMode ? $updateParking : new Parkings();
        $parking->setDirection($parking_stdClass->direction);

        $cords = new Coordinates();
        $cords->setLongitude($parking_stdClass->cords->longitude);
        $cords->setLatitude($parking_stdClass->cords->latitude);

        $parking->setCoordinates($cords);

        $parking->setStatus((bool) $parking_stdClass->status);
        $parking->setType($parking_stdClass->type);


        foreach ($parking_stdClass->timesAvailable as $timeRange) {
            $timesAvailable = new TimesAvailable();
            $timesAvailable->setTimeRanges(array($timeRange->start, $timeRange->end));
            $parking->addTimesAvailable($timesAvailable);
        }
        foreach ($parking_stdClass->daysAvailable as $DayRange) {
            $datesAvailable = new DatesAvailable();
            $datesAvailable->setDates(array($DayRange->start, $DayRange->end));
            $parking->addDatesAvailable($datesAvailable);
        }

        $parking->setPricePerHour($parking_stdClass->pricePerHour);
        $parking->setPricePerDay($parking_stdClass->pricePerDay);

        // todo: add user info
        return $parking;
    }


}