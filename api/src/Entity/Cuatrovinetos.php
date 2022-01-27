<?php

namespace App\Entity;

use App\Repository\CuatrovinetosRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CuatrovinetosRepository::class)
 */
class Cuatrovinetos
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

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $zizur;

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

    public function getZizur(): ?string
    {
        return $this->zizur;
    }

    public function setZizur(string $zizur): self
    {
        $this->zizur = $zizur;

        return $this;
    }
}
