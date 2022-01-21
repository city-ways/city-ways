<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220121123113 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this ->addSql("insert into users (id, mail, name, dni, password) values (1, 'hpimme0@posterous.com', 'Maéna', '50376193E', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (2, 'mspir1@wordpress.org', 'Léone', '24316121C', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (3, 'fattac2@delicious.com', 'André', '31171229u', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (4, 'tfilippi3@elpais.com', 'Adélaïde', '45960743L', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (5, 'jdevoy4@wisc.edu', 'Néhémie', '40767093C', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (6, 'kramsden5@sbwire.com', 'Kuí', '18114851m', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (7, 'dbrentnall6@wisc.edu', 'Chloé', '71890459U', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (8, 'mdurie7@about.com', 'Réservés', '16090873Q', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (9, 'smenaul8@macromedia.com', 'Mylène', '03618558G', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (10, 'lrobion9@mysql.com', 'Laïla', '27984831N', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (11, 'mgrundlea@istockphoto.com', 'Réjane', '44085725Y', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (12, 'ibraistedb@nba.com', 'Stéphanie', '80807448h', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (13, 'dswinburnec@hibu.com', 'Maéna', '33840796N', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (14, 'bsacazed@bloglovin.com', 'Yáo', '57310109M', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (15, 'fshuttlee@youtu.be', 'Marylène', '32739439X', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (16, 'dsissensf@bloglines.com', 'Léa', '78504760F', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (17, 'omcfadzeang@biglobe.ne.jp', 'Clélia', '66013498O', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (18, 'cquinionh@printfriendly.com', 'Stévina', '45381288l', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (19, 'dgallei@wikimedia.org', 'Loïc', '94475183p', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (20, 'gpepperillj@java.com', 'Tán', '29387841G', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (21, 'oropkesk@disqus.com', 'Célestine', '00636184M', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (22, 'claperel@typepad.com', 'Célestine', '84519627z', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (23, 'egurrym@unesco.org', 'Lài', '08428850H', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (24, 'gdibsonn@google.nl', 'Lóng', '57555909A', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (25, 'cpauntono@state.tx.us', 'Solène', '35585723J', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (26, 'sjolliffp@zimbio.com', 'Maëlla', '07262520T', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (27, 'ffoliniq@webmd.com', 'Göran', '70357515H', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (28, 'ewardhawr@dell.com', 'Gisèle', '20015427j', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (29, 'ghegdonnes@psu.edu', 'Maïté', '68659879t', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (30, 'aballet@marketwatch.com', 'Lucrèce', '42762894f', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (31, 'kfullmanu@weebly.com', 'Bécassine', '95800526J', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (32, 'mmcmahonv@accuweather.com', 'Adélie', '68396462B', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (33, 'twillgoosew@umich.edu', 'Célia', '47678815p', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (34, 'khobbenx@technorati.com', 'Loïca', '40879674S', 'Agender')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (35, 'calderseyy@wikimedia.org', 'Léonie', '49239707x', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (36, 'dduckz@vimeo.com', 'Åke', '33330251c', 'Bigender')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (37, 'africk10@indiatimes.com', 'Bérénice', '27524759E', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (38, 'colrenshaw11@github.com', 'Géraldine', '17238335e', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (39, 'pruspine12@addthis.com', 'Aimée', '32435324F', 'Polygender')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (40, 'nborsnall13@examiner.com', 'Faîtes', '42071572g', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (41, 'cpawle14@intel.com', 'Mà', '92664646x', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (42, 'ejosifovitz15@who.int', 'Léana', '14042150l', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (43, 'nworswick16@economist.com', 'Stévina', '70017334Z', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (44, 'zwarburton17@google.com.br', 'Dafnée', '92049657L', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (45, 'cbarde18@google.co.uk', 'Garçon', '20673550D', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (46, 'nmatyatin19@stumbleupon.com', 'Uò', '87572853l', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (47, 'maskam1a@imageshack.us', 'Örjan', '77448374l', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (48, 'tworld1b@state.gov', 'Néhémie', '75344360E', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (49, 'fmealing1c@digg.com', 'Françoise', '08218042l', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (50, 'lelgram1d@nsw.gov.au', 'Maëlla', '97380771u', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (51, 'gdemaria1e@usgs.gov', 'Mélys', '01689624l', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (52, 'bcorbet1f@hhs.gov', 'Inès', '22957631I', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (53, 'aroz1g@amazonaws.com', 'Salomé', '82093283z', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (54, 'vransley1h@networksolutions.com', 'Cloé', '20570037n', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (55, 'dexer1i@printfriendly.com', 'Clélia', '05783512J', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (56, 'eiredale1j@alexa.com', 'Anaëlle', '95399455T', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (57, 'vkefford1k@slashdot.org', 'Annotés', '49099914Q', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (58, 'nfoulstone1l@ezinearticles.com', 'Faîtes', '82695851A', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (59, 'bgelderd1m@tamu.edu', 'Mårten', '88094582t', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (60, 'rmaclaren1n@xing.com', 'Åslög', '92670306Z', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (61, 'gmolesworth1o@wsj.com', 'Börje', '67608395N', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (62, 'jcrosher1p@nydailynews.com', 'Pò', '21057106M', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (63, 'dsweed1q@reuters.com', 'Agnès', '30014301W', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (64, 'jguille1r@fastcompany.com', 'Ophélie', '40149005d', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (65, 'jtilmouth1s@about.com', 'Simplifiés', '86395526B', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (66, 'vmacadie1t@ezinearticles.com', 'Liè', '70227892g', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (67, 'kzahor1u@ning.com', 'Mélina', '29705590r', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (68, 'lsanthouse1v@flavors.me', 'Anaïs', '03115104c', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (69, 'dlocksley1w@php.net', 'Kévina', '39479029R', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (70, 'ecoyte1x@yolasite.com', 'Léa', '67297399P', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (71, 'nmant1y@flickr.com', 'Maëlla', '74533657F', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (72, 'ccomrie1z@altervista.org', 'Marie-josée', '09959438V', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (73, 'rstollenbeck20@goodreads.com', 'Laurélie', '73603540y', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (74, 'jdrogan21@example.com', 'Maëline', '33066381m', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (75, 'fdachs22@desdev.cn', 'Réjane', '18004153n', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (76, 'cgraver23@4shared.com', 'Hélène', '75250351V', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (77, 'aferry24@ameblo.jp', 'Rachèle', '49734333L', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (78, 'dbaudrey25@princeton.edu', 'Maïté', '39632100j', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (79, 'ncoopman26@last.fm', 'Béatrice', '66407257i', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (80, 'egoodwin27@about.com', 'Kévina', '79086679W', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (81, 'rprynne28@flickr.com', 'Lài', '23246494X', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (82, 'awoolnough29@npr.org', 'Bénédicte', '56871262q', 'Polygender')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (83, 'cboylin2a@miitbeian.gov.cn', 'Maéna', '07650405Z', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (84, 'mbabcock2b@princeton.edu', 'Táng', '29851893U', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (85, 'pblachford2c@globo.com', 'Cléa', '67347286H', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (86, 'rding2d@europa.eu', 'Åsa', '72912327b', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (87, 'ldaingerfield2e@ed.gov', 'Andréa', '73782300v', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (88, 'rsharpling2f@symantec.com', 'Ruì', '63462633B', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (89, 'bclaxson2g@bloglovin.com', 'Méng', '32967113W', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (90, 'bsafell2h@thetimes.co.uk', 'Solène', '87582086a', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (91, 'apedel2i@blogger.com', 'Séverine', '05352223y', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (92, 'ckilminster2j@google.nl', 'Méghane', '96463459F', 'Bigender')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (93, 'cwiddall2k@163.com', 'Yú', '43913512i', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (94, 'ggruszecki2l@zimbio.com', 'Sélène', '53732916V', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (95, 'wsoulsby2m@comsenz.com', 'Esbjörn', '43844534T', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (96, 'sscopes2n@apple.com', 'Eléa', '68273447O', 'Male')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (97, 'elong2o@google.com.br', 'Marylène', '43310257j', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (98, 'hbrum2p@microsoft.com', 'Uò', '94294204N', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (99, 'tbarten2q@odnoklassniki.ru', 'Laurène', '33380694Z', 'Female')");
        $this ->addSql("insert into users (id, mail, name, dni, password) values (100, 'tbaynton2r@deviantart.com', 'Göran', '31173125j', 'Female')");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
