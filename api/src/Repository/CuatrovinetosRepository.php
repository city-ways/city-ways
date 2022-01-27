<?php

namespace App\Repository;

use App\Entity\Cuatrovinetos;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Cuatrovinetos|null find($id, $lockMode = null, $lockVersion = null)
 * @method Cuatrovinetos|null findOneBy(array $criteria, array $orderBy = null)
 * @method Cuatrovinetos[]    findAll()
 * @method Cuatrovinetos[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CuatrovinetosRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cuatrovinetos::class);
    }

    // /**
    //  * @return Cuatrovinetos[] Returns an array of Cuatrovinetos objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Cuatrovinetos
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
