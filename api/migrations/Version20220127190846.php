<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220127190846 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("INSERT INTO public.coordinates (id, latitude, longitude) VALUES (1, 42.7821560, -1.6862050);");
        $this->addSql("INSERT INTO public.parkings (id, coordinates_id, direction, type, status, price_per_hour, price_per_day) VALUES (1, 1, '29550 Commercial Way', 'corta estancia', false, 1.58, 24.00);");
        $this->addSql("INSERT INTO public.times_available (id, parking_id, time_ranges) VALUES (1, 1, '{1643282487,1643286087}');");

    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
    }
}
