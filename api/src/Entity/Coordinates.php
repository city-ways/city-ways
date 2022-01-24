<?php

namespace App\Entity;

use App\Repository\CoordinatesRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CoordinatesRepository::class)
 */
class Coordinates
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=7)
     */
    private $Latitude;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=7)
     */
    private $Longitude;

    /**
     * @ORM\OneToOne(targetEntity=Parkings::class, mappedBy="Coordinates", cascade={"persist", "remove"})
     */
    private $Parking;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLatitude(): ?string
    {
        return $this->Latitude;
    }

    public function setLatitude(string $Latitude): self
    {
        $this->Latitude = $Latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->Longitude;
    }

    public function setLongitude(string $Longitude): self
    {
        $this->Longitude = $Longitude;

        return $this;
    }

    public function getParking(): ?Parkings
    {
        return $this->Parking;
    }

    public function setParking(Parkings $Parking): self
    {
        // set the owning side of the relation if necessary
        if ($Parking->getCoordinates() !== $this) {
            $Parking->setCoordinates($this);
        }

        $this->Parking = $Parking;

        return $this;
    }
}
