<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220301220509 extends AbstractMigration
{
    public function getDescription(): string
    {
        return "";
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('insert into public.users (id, mail, name, dni, password, rol) values (1, "hf@hf.com", "f", "12345678a", "$2y$13$DwEUQ1fFReykZxeTrwy7XOFRusmnwTBmyYAOjm237G16ybCJ3Xsgq", "user"');

    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql("CREATE SCHEMA public");
    }
}
