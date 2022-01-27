<?php

namespace App\Util;

use App\Entity\Parkings;

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


}