<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220207091256 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE coordinates_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE dates_available_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE history_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE parkings_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE times_available_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE users_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE coordinates (id INT NOT NULL, latitude NUMERIC(10, 7) NOT NULL, longitude NUMERIC(10, 7) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE dates_available (id INT NOT NULL, parking_id INT DEFAULT NULL, dates TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_A8A6192EF17B2DD ON dates_available (parking_id)');
        $this->addSql('COMMENT ON COLUMN dates_available.dates IS \'(DC2Type:simple_array)\'');
        $this->addSql('CREATE TABLE history (id INT NOT NULL, client_user_id INT NOT NULL, parking_id INT NOT NULL, price DOUBLE PRECISION NOT NULL, date VARCHAR(100) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_27BA704BF55397E8 ON history (client_user_id)');
        $this->addSql('CREATE INDEX IDX_27BA704BF17B2DD ON history (parking_id)');
        $this->addSql('CREATE TABLE parkings (id INT NOT NULL, coordinates_id INT NOT NULL, direction VARCHAR(255) NOT NULL, type VARCHAR(50) NOT NULL, status BOOLEAN NOT NULL, price_per_hour NUMERIC(5, 2) DEFAULT NULL, price_per_day NUMERIC(5, 2) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_AB6C607B158B0682 ON parkings (coordinates_id)');
        $this->addSql('CREATE TABLE times_available (id INT NOT NULL, parking_id INT DEFAULT NULL, time_ranges TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_EC0F3465F17B2DD ON times_available (parking_id)');
        $this->addSql('COMMENT ON COLUMN times_available.time_ranges IS \'(DC2Type:simple_array)\'');
        $this->addSql('CREATE TABLE users (id INT NOT NULL, mail VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, dni VARCHAR(9) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1483A5E95126AC48 ON users (mail)');
        $this->addSql('CREATE TABLE users_parkings (users_id INT NOT NULL, parkings_id INT NOT NULL, PRIMARY KEY(users_id, parkings_id))');
        $this->addSql('CREATE INDEX IDX_D02D4BA167B3B43D ON users_parkings (users_id)');
        $this->addSql('CREATE INDEX IDX_D02D4BA11F1C04FE ON users_parkings (parkings_id)');
        $this->addSql('ALTER TABLE dates_available ADD CONSTRAINT FK_A8A6192EF17B2DD FOREIGN KEY (parking_id) REFERENCES parkings (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704BF55397E8 FOREIGN KEY (client_user_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704BF17B2DD FOREIGN KEY (parking_id) REFERENCES parkings (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE parkings ADD CONSTRAINT FK_AB6C607B158B0682 FOREIGN KEY (coordinates_id) REFERENCES coordinates (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE times_available ADD CONSTRAINT FK_EC0F3465F17B2DD FOREIGN KEY (parking_id) REFERENCES parkings (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE users_parkings ADD CONSTRAINT FK_D02D4BA167B3B43D FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE users_parkings ADD CONSTRAINT FK_D02D4BA11F1C04FE FOREIGN KEY (parkings_id) REFERENCES parkings (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE parkings DROP CONSTRAINT FK_AB6C607B158B0682');
        $this->addSql('ALTER TABLE dates_available DROP CONSTRAINT FK_A8A6192EF17B2DD');
        $this->addSql('ALTER TABLE history DROP CONSTRAINT FK_27BA704BF17B2DD');
        $this->addSql('ALTER TABLE times_available DROP CONSTRAINT FK_EC0F3465F17B2DD');
        $this->addSql('ALTER TABLE users_parkings DROP CONSTRAINT FK_D02D4BA11F1C04FE');
        $this->addSql('ALTER TABLE history DROP CONSTRAINT FK_27BA704BF55397E8');
        $this->addSql('ALTER TABLE users_parkings DROP CONSTRAINT FK_D02D4BA167B3B43D');
        $this->addSql('DROP SEQUENCE coordinates_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE dates_available_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE history_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE parkings_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE times_available_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE users_id_seq CASCADE');
        $this->addSql('DROP TABLE coordinates');
        $this->addSql('DROP TABLE dates_available');
        $this->addSql('DROP TABLE history');
        $this->addSql('DROP TABLE parkings');
        $this->addSql('DROP TABLE times_available');
        $this->addSql('DROP TABLE users');
        $this->addSql('DROP TABLE users_parkings');
    }
}
