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
            "coordinates" => ["latitude" => $parking->getCoordinates()->getLatitude(), "longitude" => $parking->getCoordinates()->getLongitude()],
            "direction" => $parking->getDirection(),
            "type" => $parking->getType(),
            "status" => $parking->getStatus(),
            "timesAvailable" => $parking->getTimesAvailable(),
            "daysAvailable" => $datesAvailableData,
            "price_per_hour" => (float)$parking->getPricePerHour(),
            "price_per_day" => (float)$parking->getPricePerDay()
        ];


    }


}