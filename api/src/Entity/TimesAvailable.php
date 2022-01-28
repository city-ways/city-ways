<?php

namespace App\Entity;

use App\Repository\TimesAvailableRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TimesAvailableRepository::class)
 */
class TimesAvailable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;



    /**
     * @ORM\ManyToOne(targetEntity=Parkings::class, inversedBy="TimesAvailable", cascade={"persist"})
     */
    private $Parking;

    /**
     * @ORM\Column(type="simple_array", nullable=true)
     */
    private $TimeRanges = [];

    public function getId(): ?int
    {
        return $this->id;
    }
    

    public function getParking(): ?Parkings
    {
        return $this->Parking;
    }

    public function setParking(?Parkings $Parking): self
    {
        $this->Parking = $Parking;

        return $this;
    }

    public function getTimeRanges(): ?array
    {
        return $this->TimeRanges;
    }

    public function setTimeRanges(?array $TimeRanges): self
    {
        $this->TimeRanges = $TimeRanges;

        return $this;
    }
}
