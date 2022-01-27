<?php

namespace App\Entity;

use App\Repository\IkerRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=IkerRepository::class)
 */
class Iker
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
    private $hola;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHola(): ?string
    {
        return $this->hola;
    }

    public function setHola(string $hola): self
    {
        $this->hola = $hola;

        return $this;
    }
}
