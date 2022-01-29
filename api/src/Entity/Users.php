<?php

namespace App\Entity;

use App\Repository\UsersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UsersRepository::class)
 */
class Users
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Email(
     *     message = "The email '{{ value }}' is not a valid email."
     * )
     */
    private $Mail;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     */
    private $Name;

    /**
     * @ORM\Column(type="string", length=9)
     * @Assert\Regex("/^[0-9]{8,8}[A-Za-z]$/g")
     *
     */
    private $Dni;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Password;

    /**
     * @ORM\ManyToMany(targetEntity=Parkings::class)
     */
    private $UserOwns;


    public function __construct()
    {
        $this->UserOwns = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMail(): ?string
    {
        return $this->Mail;
    }

    public function setMail(string $Mail): self
    {
        $this->Mail = $Mail;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->Name;
    }

    public function setName(string $Name): self
    {
        $this->Name = $Name;

        return $this;
    }

    public function getDni(): ?string
    {
        return $this->Dni;
    }

    public function setDni(string $Dni): self
    {
        $this->Dni = $Dni;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->Password;
    }

    public function setPassword(string $Password): self
    {
        $this->Password = $Password;

        return $this;
    }

    /**
     * @return Collection|Parkings[]
     */
    public function getUserOwns(): Collection
    {
        return $this->UserOwns;
    }

    public function addUserOwn(Parkings $userOwn): self
    {
        if (!$this->UserOwns->contains($userOwn)) {
            $this->UserOwns[] = $userOwn;
        }

        return $this;
    }

    public function removeUserOwn(Parkings $userOwn): self
    {
        $this->UserOwns->removeElement($userOwn);

        return $this;
    }

    /**
     * @return Collection|Parkings[]
     */
    public function getUsesParking(): Collection
    {
        return $this->UsesParking;
    }

    public function addUsesParking(Parkings $usesParking): self
    {
        if (!$this->UsesParking->contains($usesParking)) {
            $this->UsesParking[] = $usesParking;
            $usesParking->addUserUse($this);
        }

        return $this;
    }

    public function removeUsesParking(Parkings $usesParking): self
    {
        if ($this->UsesParking->removeElement($usesParking)) {
            $usesParking->removeUserUse($this);
        }

        return $this;
    }
}
