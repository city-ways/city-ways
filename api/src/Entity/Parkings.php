<?php

namespace App\Entity;

use App\Repository\ParkingsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ParkingsRepository::class)
 */
class Parkings
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Direction;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $Type;

    /**
     * @ORM\Column(type="boolean")
     */
    private $Status;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2, nullable=true)
     */
    private $PricePerHour;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2, nullable=true)
     */
    private $PricePerDay;

    /**
     * @ORM\OneToMany(targetEntity=TimesAvailable::class, mappedBy="Parking")
     */
    private $TimesAvailable;

    /**
     * @ORM\OneToMany(targetEntity=DatesAvailable::class, mappedBy="Parking")
     */
    private $DatesAvailable;

    /**
     * @ORM\OneToOne(targetEntity=Coordinates::class, inversedBy="Parking", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $Coordinates;

    public function __construct()
    {
        $this->TimesAvailable = new ArrayCollection();
        $this->DatesAvailable = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDirection(): ?string
    {
        return $this->Direction;
    }

    public function setDirection(string $Direction): self
    {
        $this->Direction = $Direction;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->Type;
    }

    public function setType(string $Type): self
    {
        $this->Type = $Type;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->Status;
    }

    public function setStatus(bool $Status): self
    {
        $this->Status = $Status;

        return $this;
    }

    public function getPricePerHour(): ?string
    {
        return $this->PricePerHour;
    }

    public function setPricePerHour(?string $PricePerHour): self
    {
        $this->PricePerHour = $PricePerHour;

        return $this;
    }

    public function getPricePerDay(): ?string
    {
        return $this->PricePerDay;
    }

    public function setPricePerDay(?string $PricePerDay): self
    {
        $this->PricePerDay = $PricePerDay;

        return $this;
    }

    /**
     * @return Collection|TimesAvailable[]
     */
    public function getTimesAvailable(): Collection
    {
        return $this->TimesAvailable;
    }

    public function addTimesAvailable(TimesAvailable $timesAvailable): self
    {
        if (!$this->TimesAvailable->contains($timesAvailable)) {
            $this->TimesAvailable[] = $timesAvailable;
            $timesAvailable->setParking($this);
        }

        return $this;
    }

    public function removeTimesAvailable(TimesAvailable $timesAvailable): self
    {
        if ($this->TimesAvailable->removeElement($timesAvailable)) {
            // set the owning side to null (unless already changed)
            if ($timesAvailable->getParking() === $this) {
                $timesAvailable->setParking(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|DatesAvailable[]
     */
    public function getDatesAvailable(): Collection
    {
        return $this->DatesAvailable;
    }

    public function addDatesAvailable(DatesAvailable $datesAvailable): self
    {
        if (!$this->DatesAvailable->contains($datesAvailable)) {
            $this->DatesAvailable[] = $datesAvailable;
            $datesAvailable->setParking($this);
        }

        return $this;
    }

    public function removeDatesAvailable(DatesAvailable $datesAvailable): self
    {
        if ($this->DatesAvailable->removeElement($datesAvailable)) {
            // set the owning side to null (unless already changed)
            if ($datesAvailable->getParking() === $this) {
                $datesAvailable->setParking(null);
            }
        }

        return $this;
    }

    public function getCoordinates(): ?Coordinates
    {
        return $this->Coordinates;
    }

    public function setCoordinates(Coordinates $Coordinates): self
    {
        $this->Coordinates = $Coordinates;

        return $this;
    }
}
