<?php

namespace App\Repository;

use App\Entity\Iker;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Iker|null find($id, $lockMode = null, $lockVersion = null)
 * @method Iker|null findOneBy(array $criteria, array $orderBy = null)
 * @method Iker[]    findAll()
 * @method Iker[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IkerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Iker::class);
    }

    // /**
    //  * @return Iker[] Returns an array of Iker objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Iker
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
