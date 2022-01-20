<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220120115620 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE parkings (id INT AUTO_INCREMENT NOT NULL, direction VARCHAR(255) NOT NULL, type VARCHAR(50) NOT NULL, status TINYINT(1) NOT NULL, price_per_hour NUMERIC(5, 2) DEFAULT NULL, price_per_day NUMERIC(5, 2) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE times_available (id INT AUTO_INCREMENT NOT NULL, parking_id INT DEFAULT NULL, time_ranges LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', INDEX IDX_EC0F3465F17B2DD (parking_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE times_available ADD CONSTRAINT FK_EC0F3465F17B2DD FOREIGN KEY (parking_id) REFERENCES parkings (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE times_available DROP FOREIGN KEY FK_EC0F3465F17B2DD');
        $this->addSql('DROP TABLE parkings');
        $this->addSql('DROP TABLE times_available');
    }
}
