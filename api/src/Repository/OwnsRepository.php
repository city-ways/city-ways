<?php

namespace App\Repository;

use App\Entity\Uses;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Uses|null find($id, $lockMode = null, $lockVersion = null)
 * @method Uses|null findOneBy(array $criteria, array $orderBy = null)
 * @method Uses[]    findAll()
 * @method Uses[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OwnsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Uses::class);
    }

    // /**
    //  * @return Uses[] Returns an array of Uses objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Uses
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
