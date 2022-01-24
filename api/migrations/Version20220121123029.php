<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220121123029 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE coordinates (id INT AUTO_INCREMENT NOT NULL, latitude NUMERIC(10, 7) NOT NULL, longitude NUMERIC(10, 7) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE dates_available (id INT AUTO_INCREMENT NOT NULL, parking_id INT DEFAULT NULL, dates LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', INDEX IDX_A8A6192EF17B2DD (parking_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE parkings (id INT AUTO_INCREMENT NOT NULL, coordinates_id INT NOT NULL, direction VARCHAR(255) NOT NULL, type VARCHAR(50) NOT NULL, status TINYINT(1) NOT NULL, price_per_hour NUMERIC(5, 2) DEFAULT NULL, price_per_day NUMERIC(5, 2) DEFAULT NULL, UNIQUE INDEX UNIQ_AB6C607B158B0682 (coordinates_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE parkings_users (parkings_id INT NOT NULL, users_id INT NOT NULL, INDEX IDX_C2B139001F1C04FE (parkings_id), INDEX IDX_C2B1390067B3B43D (users_id), PRIMARY KEY(parkings_id, users_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE times_available (id INT AUTO_INCREMENT NOT NULL, parking_id INT DEFAULT NULL, time_ranges LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', INDEX IDX_EC0F3465F17B2DD (parking_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, mail VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, dni VARCHAR(9) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users_parkings (users_id INT NOT NULL, parkings_id INT NOT NULL, INDEX IDX_D02D4BA167B3B43D (users_id), INDEX IDX_D02D4BA11F1C04FE (parkings_id), PRIMARY KEY(users_id, parkings_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE dates_available ADD CONSTRAINT FK_A8A6192EF17B2DD FOREIGN KEY (parking_id) REFERENCES parkings (id)');
        $this->addSql('ALTER TABLE parkings ADD CONSTRAINT FK_AB6C607B158B0682 FOREIGN KEY (coordinates_id) REFERENCES coordinates (id)');
        $this->addSql('ALTER TABLE parkings_users ADD CONSTRAINT FK_C2B139001F1C04FE FOREIGN KEY (parkings_id) REFERENCES parkings (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE parkings_users ADD CONSTRAINT FK_C2B1390067B3B43D FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE times_available ADD CONSTRAINT FK_EC0F3465F17B2DD FOREIGN KEY (parking_id) REFERENCES parkings (id)');
        $this->addSql('ALTER TABLE users_parkings ADD CONSTRAINT FK_D02D4BA167B3B43D FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE users_parkings ADD CONSTRAINT FK_D02D4BA11F1C04FE FOREIGN KEY (parkings_id) REFERENCES parkings (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE parkings DROP FOREIGN KEY FK_AB6C607B158B0682');
        $this->addSql('ALTER TABLE dates_available DROP FOREIGN KEY FK_A8A6192EF17B2DD');
        $this->addSql('ALTER TABLE parkings_users DROP FOREIGN KEY FK_C2B139001F1C04FE');
        $this->addSql('ALTER TABLE times_available DROP FOREIGN KEY FK_EC0F3465F17B2DD');
        $this->addSql('ALTER TABLE users_parkings DROP FOREIGN KEY FK_D02D4BA11F1C04FE');
        $this->addSql('ALTER TABLE parkings_users DROP FOREIGN KEY FK_C2B1390067B3B43D');
        $this->addSql('ALTER TABLE users_parkings DROP FOREIGN KEY FK_D02D4BA167B3B43D');
        $this->addSql('DROP TABLE coordinates');
        $this->addSql('DROP TABLE dates_available');
        $this->addSql('DROP TABLE parkings');
        $this->addSql('DROP TABLE parkings_users');
        $this->addSql('DROP TABLE times_available');
        $this->addSql('DROP TABLE users');
        $this->addSql('DROP TABLE users_parkings');
    }
}
