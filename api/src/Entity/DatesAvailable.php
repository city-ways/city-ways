<?php

namespace App\Entity;

use App\Repository\DatesAvailableRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DatesAvailableRepository::class)
 */
class DatesAvailable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="simple_array")
     */
    private $Dates = [];

    /**
     * @ORM\ManyToOne(targetEntity=Parkings::class, inversedBy="DatesAvailable", cascade={"persist"})
     * @ORM\JoinColumn(
     *     name="parking_id",
     *     referencedColumnName="id",
     *     onDelete="CASCADE",
     * )
     */
    private $Parking;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDates(): ?array
    {
        return $this->Dates;
    }

    public function setDates(array $Dates): self
    {
        $this->Dates = $Dates;

        return $this;
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
}
