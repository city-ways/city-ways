<?php

namespace App\Repository;

use App\Entity\DatesAvailable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DatesAvailable|null find($id, $lockMode = null, $lockVersion = null)
 * @method DatesAvailable|null findOneBy(array $criteria, array $orderBy = null)
 * @method DatesAvailable[]    findAll()
 * @method DatesAvailable[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DatesAvailableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DatesAvailable::class);
    }

    // /**
    //  * @return DatesAvailable[] Returns an array of DatesAvailable objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DatesAvailable
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
