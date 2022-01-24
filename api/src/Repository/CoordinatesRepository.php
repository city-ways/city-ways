<?php

namespace App\Repository;

use App\Entity\Coordinates;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Coordinates|null find($id, $lockMode = null, $lockVersion = null)
 * @method Coordinates|null findOneBy(array $criteria, array $orderBy = null)
 * @method Coordinates[]    findAll()
 * @method Coordinates[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CoordinatesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Coordinates::class);
    }

    // /**
    //  * @return Coordinates[] Returns an array of Coordinates objects
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
    public function findOneBySomeField($value): ?Coordinates
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
