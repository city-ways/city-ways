<?php

namespace App\Entity;

use App\Repository\HistoryRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=HistoryRepository::class)
 */
class History
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     */
    private $Price;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $Date;

    /**
     * @ORM\Column(type="boolean")
     */
    private $InProgress;

    /**
     * @ORM\ManyToOne(targetEntity=Users::class, inversedBy="History")
     * @ORM\JoinColumn(onDelete="SET NULL")
     */
    private $ClientUser;

    /**
     * @ORM\ManyToOne(targetEntity=Parkings::class, inversedBy="History")
     * @ORM\JoinColumn(onDelete="SET NULL")
     */
    private $Parking;

    /**
     * @param float $Price
     * @param $Date
     * @param $ClientUser
     * @param $Parking
     */
    public function __construct($Date, $ClientUser, $Parking, float $Price = 0.0)
    {
        $this->Price = $Price;
        $this->Date = $Date;
        $this->ClientUser = $ClientUser;
        $this->Parking = $Parking;
        $this->InProgress = true;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrice(): ?float
    {
        return $this->Price;
    }

    public function setPrice(float $Price): self
    {
        $this->Price = $Price;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->Date;
    }

    public function setDate(string $Date): self
    {
        $this->Date = $Date;

        return $this;
    }

    public function getClientUser(): ?Users
    {
        return $this->ClientUser;
    }

    public function setClientUser(?Users $ClientUser): self
    {
        $this->ClientUser = $ClientUser;

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

    /**
     * @return bool
     */
    public function isInProgress(): bool
    {
        return $this->InProgress;
    }

    /**
     * @param bool $InProgress
     */
    public function setInProgress(bool $InProgress): void
    {
        $this->InProgress = $InProgress;
    }

}
