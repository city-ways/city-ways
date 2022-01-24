<?php

namespace App\Repository;

use App\Entity\TimesAvailable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TimesAvailable|null find($id, $lockMode = null, $lockVersion = null)
 * @method TimesAvailable|null findOneBy(array $criteria, array $orderBy = null)
 * @method TimesAvailable[]    findAll()
 * @method TimesAvailable[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TimesAvailableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TimesAvailable::class);
    }

    // /**
    //  * @return TimesAvailable[] Returns an array of TimesAvailable objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TimesAvailable
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
