<?php

namespace App\Entity;

use App\Repository\UsersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UsersRepository::class)
 * @method string getUserIdentifier()
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="rol", type="string")
 * @ORM\DiscriminatorMap({"user" = "Users", "admin" = "Admin"})
 */
class Users implements UserInterface, PasswordAuthenticatedUserInterface
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
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
     * @Assert\Regex("/^[0-9]{8,8}[A-Za-z]$/")
     *
     */
    private $Dni;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Password;

    /**
     * @ORM\ManyToMany(targetEntity=Parkings::class, inversedBy="Owner", cascade={"remove"})
     * @ORM\JoinTable(name="owners")
     * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private $Owns;

    /**
     * @ORM\OneToMany(targetEntity=History::class, mappedBy="ClientUser", cascade={"remove"}, orphanRemoval=true)
     */
    private $History;



    public function __construct()
    {
        $this->Owns = new ArrayCollection();
        $this->History = new ArrayCollection();
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
    public function getOwns(): Collection
    {
        return $this->Owns;
    }

    public function addOwn(Parkings $own): self
    {
        if (!$this->Owns->contains($own)) {
            $this->Owns[] = $own;
        }

        return $this;
    }

    public function removeOwn(Parkings $own): self
    {
        $this->Owns->removeElement($own);

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
            $history->setClientUser($this);
        }

        return $this;
    }

    public function removeHistory(History $history): self
    {
        if ($this->History->removeElement($history)) {
            // set the owning side to null (unless already changed)
            if ($history->getClientUser() === $this) {
                $history->setClientUser(null);
            }
        }

        return $this;
    }

    public function getRoles(): array
    {
        return array('ROLE_USER');
    }

    public function getSalt()
    {
        return null;
    }

    public function eraseCredentials()
    {
        return null;
    }

    public function getUsername()
    {
        return $this->Mail;
    }

    public function __call($name, $arguments)
    {
        // TODO: Implement @method string getUserIdentifier()
    }
}
