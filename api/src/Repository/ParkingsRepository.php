<?php

namespace App\Repository;

use App\Entity\Parkings;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Parkings|null find($id, $lockMode = null, $lockVersion = null)
 * @method Parkings|null findOneBy(array $criteria, array $orderBy = null)
 * @method Parkings[]    findAll()
 * @method Parkings[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ParkingsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Parkings::class);
    }

    // /**
    //  * @return Parkings[] Returns an array of Parkings objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Parkings
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
