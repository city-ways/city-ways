<?php

namespace App\Entity;

use App\Repository\ParkingsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
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
     * @Assert\NotBlank
     */
    private $Direction;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\Choice(
     *     choices = {"larga estancia", "corta estancia"},
     *     message = "Choose a valid type."
     * )
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
     * @ORM\OneToMany(targetEntity=TimesAvailable::class, mappedBy="Parking", cascade={"persist"})
     */
    private $TimesAvailable;

    /**
     * @ORM\OneToMany(targetEntity=DatesAvailable::class, mappedBy="Parking", cascade={"persist"})
     */
    private $DatesAvailable;

    /**
     * @ORM\OneToOne(targetEntity=Coordinates::class, inversedBy="Parking", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $Coordinates;

    /**
     * @ORM\ManyToMany(targetEntity=Users::class, mappedBy="Owns")
     */
    private $Owner;

    /**
     * @ORM\OneToMany(targetEntity=History::class, mappedBy="Parking")
     */
    private $History;


    public function __construct()
    {
        $this->TimesAvailable = new ArrayCollection();
        $this->DatesAvailable = new ArrayCollection();
        $this->Owner = new ArrayCollection();
        $this->History = new ArrayCollection();
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

    /**
     * @return Collection|Users[]
     */
    public function getUserUses(): Collection
    {
        return $this->UserUses;
    }

    public function addUserUse(Users $userUse): self
    {
        if (!$this->UserUses->contains($userUse)) {
            $this->UserUses[] = $userUse;
        }

        return $this;
    }

    public function removeUserUse(Users $userUse): self
    {
        $this->UserUses->removeElement($userUse);

        return $this;
    }

    /**
     * @return Collection|Users[]
     */
    public function getOwner(): Collection
    {
        return $this->Owner;
    }

    public function addOwner(Users $owner): self
    {
        if (!$this->Owner->contains($owner)) {
            $this->Owner[] = $owner;
            $owner->addOwn($this);
        }

        return $this;
    }

    public function removeOwner(Users $owner): self
    {
        if ($this->Owner->removeElement($owner)) {
            $owner->removeOwn($this);
        }

        return $this;
    }

    /**
     * @return Collection|History[]
     */
    public function getHistory(): Collection
    {
        return $this->History;
    }

    public function addHistory(History $history): self
    {
        if (!$this->History->contains($history)) {
            $this->History[] = $history;
            $history->setParking($this);
        }

        return $this;
    }

    public function removeHistory(History $history): self
    {
        if ($this->History->removeElement($history)) {
            // set the owning side to null (unless already changed)
            if ($history->getParking() === $this) {
                $history->setParking(null);
            }
        }

        return $this;
    }
}
