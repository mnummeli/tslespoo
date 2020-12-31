<head>
  <meta charset="UTF-8"/>
  <style>
    body {
      max-width: 800px;
      margin: auto;
    }
  </style>
</head>

# Docker-ohjelmisto ja konttiteknologiat

&copy; 2020, Mikko Nummelin

## Yleistä

Tämä on Työväen Sivistysliiton Espoon ja Kauniaisten opintojärjestön
kurssimateriaali konttiteknologioista Docker-palvelualustalla.
Kurssin tarkoitus on tutustuttaa oppilaat konttiteknologioiden
peruskäsitteisiin, kuten levykuviin (image), palveluihin (service), niihin
liittyviin ns. "kontteihin" (container), sekä virtuaalilevyasemiin (volume).
Kurssilla on joitakin harjoitustehtäviä ja esimerkkejä. Kurssin kompaktisuuden
vuoksi jotkut vaativammat konttiteknologiaa hyödyntävät ohjelmistot kuten
Kubernetes ja sen johdannainen Openshift sivuutetaan, mutta näihin voi tutustua
kuitenkin annettujen linkkien takana olevan (englanninkielisen) materiaalin
välityksellä. Docker Swarm:in avulla määriteltävät palvelukokonaisuudet ja
rinnakkaisuus käsitellään pintapuolisesti ja näiden järjestelmien asentamista
useiden fyysisten tietokoneiden muodostamaan rinnakkaislaskennan verkkoon eli
ns. "klusteriin" ei käsitellä.

*Kurssi toimii myös valmentavana materiaalina opiskelijoille, jotka aikovat
hakea työharjoittelupaikkaa konttiteknologioita hyödyntävissä projekteissa
tietotekniikan alan yrityksissä. On huomattava, että ohjelmistojen asentaminen
konttiteknologian mukaisiksi palveluiksi on yleistynyt kirjoitushetkellä ja
sitä edeltäneinä vuosina voimakkaasti.*

## Historiaa (mitä ovat konttiteknologiat ja mikä on Docker)

1990-luvun alkupuolella suomalainen Linus Torvalds kehitti sittemmin maailman
tunnetuimman käyttöjärjestelmän ytimen, joka kuuluu
Unix-järjestelmiin. Linux-käyttöjärjestelmät ovat sittemmin käytössä lukuisissa
elektronisissa laitteissa, kuten Android-puhelimissa, pöytäkoneissa,
kannettavissa tietokoneissa sekä palvelinsaleissa. Kun käyttöjärjestelmän
ydintä kehitettiin, siihen tehtiin ominaisuuksia, jotka mahdollistavat
tiettyjen ajettavien ohjelmien eli prosessien pääsyn rajoituksia erilaisiin
resursseihin kuten tiedostojärjestelmän osiin niiden oikeuksien perusteella.
Osa näistä oikeuksista riippuu siitä, mikä käyttäjä niitä käyttää,
mutta osa niistä liittyy nimiavaruuksiin ja tiettyjen hakemistojen eristämiseen
muusta hakemistopuusta. Asiasta on englanninkielinen artikkeli tässä:

* https://medium.com/@BeNitinAgarwal/understanding-the-docker-internals-7ccb052ce9fe

Docker on ohjelmistoalusta, joka tehtiin hyödyntämään tätä erottelua.
Jos tulee esimerkiksi tarve asentaa erikseen WordPress-verkkosivuohjelmisto ja
sen tarvitsema MySQL-relaatiotietokanta, on mahdollista tehdä järjestelmä, jossa
on aliverkko ja kaksi palvelua, toinen WordPressille, toinen MySQL:lle.
Nämä palvelut ovat erillisiä ja ne eivät voi muuttaa toistensa levyasemien
tiedostoja muuten kuin tarkasti säännellyillä tavoilla verkkokutsuja tekemällä.
Näiden levyasemien sisältö on myös erillinen Dockeria ajavan isäntäkoneen
kiintolevyn sisällöstä tietyin poikkeuksin. Kurssi ja sillä oleva esimerkit
selventänevät tätä asiaa.

## Hyödyllisiä linkkejä

Seuraavat linkit kannattaa laittaa selaimesi kirjanmerkkeihin. Niiden alta
löytyy yleistä tietoa Dockerista ja konttiteknologioista:

* https://docs.docker.com/
* https://docs.docker.com/compose/

## 1. OPPITUNTI: Dockerin asentaminen

Tarkasta alta käyttöjärjestelmäsi mukainen Docker-asennusohje. Kiinnitä
erityisesti huomiota siihen, että lisäät oman käyttäjäsi
`docker`-käyttäjäryhmään.

### Windows-käyttöjärjestelmät

Ohjeet Docker for Windowsin asentamiseksi Microsoft Windows-järjestelmiin
ovat täällä. Koska Windows ei pysty ajamaan Docker-alustaa suoraan,
asennusohjelma perustaa Linux-virtuaalikoneen Hyper-V-emulaattorin ajettavaksi,
jossa itse Docker-prosessit ajetaan.

https://docs.docker.com/docker-for-windows/install/

### Linux-käyttöjärjestelmät

Ohjeet Dockerin asentamiseksi GNU/Linux-järjestelmiin ovat täällä.
Linuxin käyttöjärjestelmäydin pystyy ajamaan Docker-alustaa ja sen prosesseja
suoraan ilman virtuaalikonetta.

https://docs.docker.com/engine/install/

Huomaa, että monissa Linux-järjestelmissä Docker-Compose on asennettava
erikseen! Esimerkiksi Ubuntu Linux-järjestelmässä sekä Dockerin että
Docker-Composen asennus tapahtuu kirjoittamalla:

```
$ sudo apt-get install docker.io docker-compose
```

Käyttäjän lisääminen Docker-ryhmään tapahtuu käskyllä:

```
$ sudo usermod -aG docker <KÄYTTÄJÄTUNNUKSESI>
```

Tämän jälkeen tulee kirjautua ulos ja uudelleen sisään.

### Mac OS-käyttöjärjestelmät

Ohjeet Docker for Windowsin asentamiseksi Apple Macintosh-järjestelmiin
ovat täällä. Koska Mac ei pysty ajamaan Docker-alustaa suoraan,
asennusohjelma perustaa Linux-virtuaalikoneen emulaattorin ajettavaksi,
jossa itse Docker-prosessit ajetaan.

https://docs.docker.com/docker-for-mac/install/

### TEHTÄVÄ 1.1. Docker-asennuksen tarkastaminen

Tarkasta Docker-asennuksesi kirjoittamalla:

```
$ docker ps
```

Jos asennus on onnistunut hyvin, lopputuloksen tulisi näyttää suunnilleen tältä:

```
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

Mikäli et kuulunut Docker-ryhmään tai Docker-järjestelmä ei ollut käynnissä,
tulee virheilmoituksia.

## 2. OPPITUNTI: Levykuvan (`image`) lataaminen ja yksinkertaisen palvelun (`container`) käynnistys

Dockerin varsinainen hyöty saadaan irti hyödyntämällä erilaisia palveluita
toteuttavia *levykuvia*, joiden englanninkielinen nimi on *image*. Erilaisia
valmiita virallisia levykuvia löytyy osoitteesta:

https://hub.docker.com/

Alkeisesimerkkinä, jonka monet yleensä ensimmäisenä Dockeria opetellessaan
ajavat, käytetään "Hello World"-esimerkkiä:

https://hub.docker.com/_/hello-world

Se ajetaan käskyllä:

```
$ docker run hello-world
```

Mikäli kaikki meni oikein, sen pitäisi ladata verkosta levykuvaa ja sen jälkeen
tulostaa jotakin seuraavan tapaista:

```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

Kuten Docker suosittaa, seuraavaksi voi kokeilla käynnistää Ubuntu Linuxin
levykuvan käskyllä (muokatkaamme sitä kuitenkin hieman lisäämällä `--rm`),
jolloin jotakin seuraavanlaista tapahtuu:

```
$ docker run -it --rm ubuntu bash
root@53ebc3eef616:/#
```

Meillä on siis ylläpitäjän (root) konsoli perus-Ubuntu-asennuksessa. Jos
yritämme esimerkiksi luoda tiedostoa `testi.md` tekstieditorilla `nano`,
havaitsemme, ettei ohjelmaa ole käytettävissä:

```
root@53ebc3eef616:/# nano testi.md
bash: nano: command not found
```

Voimme tietenkin asentaa `nano`:n Ubuntun pakettityökaluilla, jonka jälkeen
tekstitiedoston luonti ja editointi onnistuu:

```
root@53ebc3eef616:/# apt-get update && apt-get install nano
... sekalaisia asennusilmoituksia
root@53ebc3eef616:/# nano testi.md
... editori aukeaa, kirjoitetaan tiedostoon TSL
root@53ebc3eef616:/# cat testi.md 
TSL
```

Seuraavaksi poistutaan Ubuntun komentokehotteesta, jolloin palvelu samalla
sammuu:

```
root@53ebc3eef616:/# exit         
exit
```

Jos nyt käynnistetään Ubuntu uudelleen samasta levykuvasta, havaitaan taas,
että:
- `nano` ei ole enää käytössä
- `testi.md` on hävinnyt

```
$ docker run -it --rm ubuntu bash
root@41ae463c5681:/# nano
bash: nano: command not found
root@41ae463c5681:/# ls 
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

Tämä on tarkoitettu toiminnallisuus. Lähtökohtaisesti palvelu käynnistyy aina
siitä tilanteesta, mitä levykuva sisältää ja palvelun sisällä myöhemmin tehdyt
muutokset eivät pysy. Tämä luo ennustettavuutta siihen, millaisessa tilassa
halutaan palvelun olevan kun se käynnistetään. Käydään läpi tiivistelmä siitä,
mitä komento `docker run -it --rm ubuntu bash` oikein teki:
- `docker`: ajetaan docker-ohjelma
- `run`: halutaan käynnistää joku palvelu
- `-it`: halutaan avata interaktiivinen terminaali
- `--rm`: halutaan siivota pois tarpeettomat resurssit muistista kun palvelu sammuu
- `ubuntu`: halutaan käyttää levykuvaa `ubuntu` omalta kiintolevyltä, jos saatavilla, muuten Docker Hub:ista
- `bash`: halutaan ajaa terminaalissa komentokehote `bash`

### Palvelun ajaminen irrotettuna (detached)

Yleensä käytännön tapauksissa, jos halutaan esimerkiksi useiden palveluiden
pyörivän Docker-järjestelmässä asiakkaiden tietokoneilla, ei haluta avata jokaiseen
palveluun tarpeetonta komentokehotetta. Tällöin on järkevää ajaa palvelu
*irrotettuna* ja vain tarvittaessa avata sinne komentokehote tai muu apuohjelma.
Seuraavassa esimerkissä Ubuntu-palvelu luodaan irrotettuna, sen jälkeen
palvelun sisään avataan komentokehote, asennetaan `nano`, luodaan tiedosto,
tullaan tilapäisesti pois komentokehotteesta, palataan takaisin palvelun
sisään, jolloin *huomataan nano:n ja testitiedoston olevan edelleen tallella*,
mutta sen jälkeen kun palvelu on sammutettu ja uudelleenkäynnistetty, *`nano`
ja testitiedosto ovat hävinneet*:

```
$ docker run -d -it --name tsl-ubuntu ubuntu
be0162191935c24d68c2320c4a2559e9c12062285983db0252ac98a9bc47f991
$ docker exec -it tsl-ubuntu bash
root@be0162191935:/# ps
    PID TTY          TIME CMD
     15 pts/1    00:00:00 bash
     23 pts/1    00:00:00 ps
root@be0162191935:/# apt-get update && apt-get install nano
root@be0162191935:/# mkdir tslespoo
root@be0162191935:/# cd tslespoo
root@be0162191935:/tslespoo# nano testi.md
root@be0162191935:/tslespoo# ls
testi.md
root@be0162191935:/tslespoo# cat testi.md
TSL
root@be0162191935:/tslespoo# exit
exit

$ docker exec -it tsl-ubuntu bash
root@be0162191935:/# cd tslespoo
root@be0162191935:/tslespoo# cat testi.md 
TSL
root@be0162191935:/tslespoo# exit
exit

$ docker container rm -f tsl-ubuntu
tsl-ubuntu
$ docker run -d -it --name tsl-ubuntu ubuntu
c6e15094b2f635d96a968c81ea8ee71a301d6cc048a66663b1e1212c52901b7d
✔$ docker exec -it tsl-ubuntu bash
root@c6e15094b2f6:/# cd tslespoo
bash: cd: tslespoo: No such file or directory
root@c6e15094b2f6:/# nano
bash: nano: command not found
root@c6e15094b2f6:/# exit
exit

$ docker container rm -f tsl-ubuntu
tsl-ubuntu
```

Melkoinen testisessio, mutta siinä opimme, että mikäli palvelu on taustalla
käynnissä irrotettuna ja siihen palataan, asennetut ohjelmat ja tiedostot
säilyvät, mutta kun palvelun lopulta sammuttaa `docker container rm -f`-käskyllä,
tällaiset muutokset häviävät ja seuraavan kerran kun palvelun käynnistää,
palataan taas siihen lähtötilanteeseen, mikä on levykuvassa määritelty.

Seuraavalla oppitunnilla opitaan, miten voidaan luoda pysyvämpiä ohjelmistoasennuksia
tekemällä omia levykuvia ja kuinka tietyt rajoitetut tiedostot voidaan säästää
käynnistyskertojen välilläkin laittamalla ne virtuaalilevyasemalle (volume).

### Porttien välittäminen isäntäkoneen portteihin

On tietenkin myös lukuisia muita hyödyllisiä levykuvia kuin tavallinen Ubuntu.
Eräät käytetyimmistä ovat verkkosivupalveluita ja niiden johdannaisia.
Seuraavalla käskyllä käynnistetään irrotettuna Apache HTTPD-palvelin sekä
välitetään sen portti 80 isäntäkoneen porttiin 8080.

```
$ docker run -d --name httpd -p 8080:80 httpd
```
Jos nyt selaimen ohjaa osoitteeseen

http://localhost:8080

nähdään alkeellinen verkkosivu. Kun palvelun sammuttaa:

```
$ docker container rm -f httpd
```

verkkosivu ei enää vastaa. Mikäli taaskin olisi tehty palvelimelle omia sivuja,
ne olisivat hävinneet sammuttamisen yhteydessä.

### TEHTÄVÄ 2.1. hello-world, docker/whalesay ja bash

Kokeile levykuvaa docker/whalesay seuraavasti:

```
$ docker run docker/whalesay cowsay TSL
```

Mitä se tulostaa? Miksi:

```
$ docker run -it --rm docker/whalesay bash
```

tuottaa komentorivikehotteen, mutta

```
$ docker run -it --rm hello-world bash
```

aiheuttaa virheilmoituksen? Vihje: mieti, mitä levykuvat sisältävät.

### TEHTÄVÄ 2.2. httpd ja omat sivut

Käynnistä `httpd` komennolla:

```
$ docker run -d --name httpd -p 8080:80 httpd
```

kuten yllä. Luo sen jälkeen kyseisen palvelun sisään interaktiivinen
`bash`-komentokehote, mene hakemistoon `/usr/local/apache2/htdocs`, asenna
`nano` ja luo oma verkkosivu itse valitsemallasi sisällöllä, älä kuitenkaan
millään vaikealla tai korvaamattomalla, tiedostoon `testi.html`.
Totea selaimella, että osoitteessa:

http://localhost:8080/testi.html

näkyy luomasi verkkosivu. Sammuta sen jälkeen `httpd` käskyllä:

```
$ docker container rm -f httpd
```

Onko verkkosivusi menetetty?

### Lisätietoa

Useissa Docker-asennuksissa on komentorivin aputoiminto --help, jolla saa
lisätietoa yksittäisistä Docker-komennoista. Esimerkiksi

```
$ docker --help
```

listaa Dockerin komennot hyvin lyhyine selityksineen, tarkemman tiedon ollessa
saatavilla kirjoittamalla komentoa pidemmälle ja sitten --help. Tällä
oppitunnilla käsitellyistä asioista tarkempaa tietoa löytyy esimerkiksi
komennoilla:

```
$ docker run --help
$ docker ps --help
$ docker container --help
$ docker image --help
```

On suositeltavaa tutustua tällä tavoin kurssilla esiin tuleviin
Docker-komentoihin tai miksei muihinkin.

## 3. OPPITUNTI: Omien levykuvien laatiminen sekä virtuaalilevyasemat (`volume`)

Edellisellä oppitunnilla todettiin, että kun palvelun käynnistää levykuvasta
käskyllä `docker run`, tekee muutoksia palvelun sisällä ja sammuttaa palvelun
käskyllä `docker container rm`, tehdyt muutokset menetetään. Kuitenkin monesti
on niin, että halutaan tilanne, jossa palvelua käynnistettäessä esimerkiksi
tietyt asennetut ohjelmat olisivat käytettävissä. Tällöin paras ratkaisu
on tehdä *oma levykuva* johtamalla se olemassa olevasta levykuvasta. Tämän
voi tehdä monella tapaa, mutta suositeltavin tapa on kirjoittaa `Dockerfile`.
Se kertoo, mistä alkuperäisestä levykuvasta lähdetään liikkeelle ja mitä
komentoja sen sisällä annetaan uuden levykuvan luomiseksi. Nämä komennot
luovat uuteen levykuvaan uusia *kerroksia* (layers).

Jos esimerkiksi haluamme Ubuntu-levykuvan, jossa on lähtökohtaisesti käytössä
ylimääräiset komennot `nano` ja `less`, sitä varten voidaan luoda tiedosto:

#### Dockerfile
```dockerfile
FROM ubuntu
RUN \
    apt-get update && \
    apt-get install less nano
```

luoda uusi levykuva käskyllä:

```
$ docker build -t tsl-ubuntu .
```

ja kokeilla sitä käskyillä:

```
$ docker run -it --rm tsl-ubuntu
root@07072c62fc30:/# mkdir tslespoo
root@07072c62fc30:/# nano testi.txt
root@07072c62fc30:/# exit
exit
```

Nyt meillä on omatekoinen `ubuntu`:sta johdettu levykuva `tsl-ubuntu`, jossa
on valmiina käskyt `nano` ja `less`. Oman levykuvan teko oli yksinkertaista,
otettiin `ubuntu` lähtökohdaksi `FROM`-käskyllä ja `RUN`-käskyllä ajettiin
uutta levykuvaa varten standardit Ubuntu Linuxin asennuskomennot pakettien
`less` ja `nano` asentamiseksi. Esimerkin voi ajaa hakemistossa `tsl-ubuntu`.

### TEHTÄVÄ 3.1. less

Ota selvää, mitä tekee käsky `less` ja käytä sitä `tsl-ubuntu`-palvelussa kun
palvelu on päällä.

### Virtuaalilevyasemat (volume)

Jo aiemmin oli puhetta siitä, että joissakin tapauksissa halutaan kuitenkin
säilyttää tietyissä hakemistoissa olevat tiedostot, vaikka palvelu välillä
sammutettaisiin (ja mahdollisesti päivitetään vaikkapa uudemmalla levykuvan
versiolla). Tähän ongelmaan paras ratkaisu ovat ns. virtuaalilevyasemat
(engl. volume). Käynnistetään yllä mainittu palvelumme `tsl-ubuntu` siten,
että sen hakemisto `tslespoo` on kiinnitetty samannimiseen virtuaalilevyasemaan:

```
$ docker volume create tslespoo
tslespoo
$ docker run -it --rm -v "tslespoo:/tslespoo" tsl-ubuntu
root@c3067f501d0e:/# cd tslespoo
root@c3067f501d0e:/tslespoo# nano testi.txt
root@c3067f501d0e:/tslespoo# cat testi.txt
TSL:n kurssilla opit koodaamaan!
root@c3067f501d0e:/tslespoo# exit
exit
✔
$ docker run -it --rm -v "tslespoo:/tslespoo" tsl-ubuntu
root@314e0cfffa1b:/# cd tslespoo
root@314e0cfffa1b:/tslespoo# cat testi.txt 
TSL:n kurssilla opit koodaamaan!
root@314e0cfffa1b:/tslespoo# exit
exit
```

Yllä olevasta esimerkistä näkyy, kuinka nyt tiedosto säilyikin
uudelleenkäynnistyksen yli, koska se oli virtuaalilevyasemalla eikä vain
palvelun muistinvaraisessa osassa. Tyypillisimmät asiat, joita laitetaan
virtuaalilevyasemille ovat esim. verkkosivut, tietokantojen sisältötiedostot
ja lokiin talteen otettavat sovellusilmoitukset. Jälkimmäiset siksi, että
niitä usein tarvitaan ohjelmistojen virhetilanteiden selvittelyssä.

Virtuaalilevyasemat on mahdollista myös tuhota, esimerkiksi tässä tapauksessa
komennolla `docker volume rm tslespoo`. Tällöin yllämainittu testitiedostomme
tietenkin häviää samalla kuin muukin mahdollinen virtuaalilevyaseman sisältö.
Oikeasti tärkeistä tiedostoista tulee aina olla varmuuskopiot myös muualla.
Esimerkki, miten voidaan tilapäisesti käynnistää palvelu vain siksi ajaksi,
että sen sisältämä virtuaalilevyasema varmuuskopioidaan:

```
$ docker run -it --rm -v "tslespoo:/tslespoo" -d --name tsl-ubuntu tsl-ubuntu && docker cp tsl-ubuntu:/tslespoo tslespoo && docker container rm -f tsl-ubuntu
e9f1ff41adb7ee530c03b6b8cfe3ee9dea248be39f0070c438b715c2973ed05c
tsl-ubuntu
```

### TEHTÄVÄ 3.2.

Miksi äskeisessä varmuuskopiointikomennossa ajoimme palvelun *irrotettuna*
lisäämällä vivun `-d`?

### TEHTÄVÄ 3.3.

Selvitä itsellesi käskyllä `docker cp --help`, mitä tarkemmin tekee
`docker cp`-käsky. Luo sen jälkeen komentoketju, jolla kopioit isäntäkoneeltasi
seuraavan sisältöisen tekstitiedoston `huomautus.txt`:

```
Joka ei koodata osaa, ei sen syömänkään pidä!
```

virtuaalilevyasemalle `tslespoo`.

## 4. OPPITUNTI: Useiden palveluiden yhdistäminen `docker-compose`:lla

Kuten edellisellä oppitunnilla huomasimme, mikäli palveluita ja niiden
määrityksiä on kovin paljon, tulee `docker`-komennoista helposti pitkiä ja
hankalia ja niitä on ajettava useita peräjälkeen. Tätä varten on luotu
`docker`:in päälle apuvälineitä, jotka toivottavasti yksinkertaistavat tätä.
Tällä oppitunnilla esitellään `docker-compose`. Sen ideana on, että
kirjoitetaan ensin *määrittelytiedosto* `docker-compose.yml`, joka kertoo
mitä palveluita käynnistetään, miten ne liittyvät toisiinsa ja mitä
muita objekteja kuten virtuaalilevyasemia tai verkkoyhteyksiä ne käyttävät.
Opetellaan näitä esimerkkien avulla.

### Yksi palvelu node.js-kehitystyötä varten

Ne, jotka ovat tekneet node.js Javascriptillä projektien taustapalveluita
(backend), tietävät, että normaalisti jos palvelua muuttaa, joutuu käynnistämään
verkkopalvelimen uudelleen, mikäli haluaa muutosten näkyvän. Docker-compose
tarjoaa kuitenkin mahdollisuuden palveluun, joka uudelleenkäynnistyy kun
palvelu sammuu. Jos olet kloonannut tämän Git-repositoryn, seuraavat tiedostot
ovat saatavissa alihakemistosta `/node-dev`.

#### `.dockerignore`

Emme halua kopioida verkosta haettuja `node.js`-kirjastoja, siksi tämä tiedosto:

```dockerignore
node_modules/
```

#### `package.json`

Tässä määritellään, mitkä `node.js`-kirjastot asennetaan ja muutamia muita
paketin ominaisuuksia

```json
{
    "name": "node-dev",
    "version": "0.0.1",
    "description": "Yksinkertainen node.js-kehitysalusta perustuen Express-palvelimeen",
    "main": "index.js",
    "scripts": {
        "start": "node server.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [
        "TSL",
        "node.js",
        "docker-compose"
    ],
    "author": "TSL:n Espoon ja Kauniaisten opintojärjestö",
    "repository": "http://github.com/mnummeli/tslespoo.git",
    "license": "ISC",
    "dependencies": {
        "express": "^4.17.1"
    }
}
```

#### `server.js`

Tämä on itse Express-verkkopalvelinta käyttävä lähdekoodi:

```javascript
#!/usr/bin/env node

/* global process */

'use strict';

const express = require('express');
const app = express();
const os = require('os');
const PORT = process.env.NODE_PORT || 3000;

app.get('/hei', (req, res) => {
    res.set({'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`Hei ${req.query.nimi}!`);
});

app.get('/palvelimen-nimi', (req, res) => {
    res.set({'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`Hei palvelimelta ${os.hostname()}!`);
});

app.use((req, res) => {
    res.set({'Content-Type': 'text/html; charset=utf-8'});
    res.status(404);
    res.end(`<h2 style="color: red; background-color: yellow;">Palvelua ei ` +
            `löytynyt polussa ${req.path}.</h2>`);
});

app.listen(PORT, () => {
    console.log(`Sovellus vastaa portissa ${PORT}.`);
});
```

Kun nämä tiedostot on esitelty, kannattaa testata sovellusta ensin ilman
Dockeria. Hakemistossa, jossa nämä sijaitsevat, kirjoita:

```
$ npm install
... asennusilmoituksia
$ npm start

> node-dev@0.0.1 start /home/mnummeli/Asiakirjat/javascript/tslespoo/kurssit/docker/node-dev
> node server.js

Sovellus vastaa portissa 3000.
```

ja mene sen jälkeen seuraaviin verkko-osoitteisiin:

* http://localhost:3000/hei?nimi=TSL
* http://localhost:3000/palvelimen-nimi
* http://localhost:3000/jotainmuuta

Katso, että vastaukset ovat järkeviä. Ensinmainittu on tervehdys, toisen pitäisi
kertoa palvelimesi nimi ja kolmas on virhesivu poluille, joista ei löydy
muuta verkkopalvelua. Paina `Ctrl+C` sammuttaaksesi verkkopalvelimen. Sen
jälkeen edellisten verkkosivujen ei tietenkään kuulu enää vastata.

#### Dockerfile

Laitetaan sovellus seuraavaksi pyörimään Dockerilla "tavalliseen tapaan":

```dockerfile
FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENTRYPOINT ["npm"]
CMD ["start"]
```

Nyt levykuva voidaan laatia (build) käskyllä:

```
$ docker image build -t node-dev:0.0.1 .
```

ja ajaa käskyllä:

```
$ docker run -d -p "3000:3000" --name node-dev node-dev:0.0.1
```

Voit tarkastaa käskyllä:

```
$ docker logs node-dev

> node-dev@0.0.1 start
> node server.js

Sovellus vastaa portissa 3000.
```

että sovellus on käynnissä ja sen jälkeen kokeilla jälleen samoja
verkko-osoitteita kuten yllä:

* http://localhost:3000/hei?nimi=TSL
* http://localhost:3000/palvelimen-nimi
* http://localhost:3000/jotainmuuta

### Tehtävä 4.1.

Miksi verkko-osoitteesta http://localhost:3000/palvelimen-nimi tulee nyt eri
palvelimen nimi kuin aiemmin?

---

Palvelu sammutetaan tuttuun tapaan käskyllä

```
$ docker container rm -f node-dev
```

Siirrytään vihdoin itse `docker-compose`en. Kirjoitetaan seuraavanlainen
tiedosto:

#### `docker-compose.yml`

```docker-compose
version: "3"

services:
    node-dev:
        build: .
        environment:
            - NODE_PORT=3000
        ports:
            - "3000:3000"
        restart: always
        networks:
            - internal
        volumes:
            - ".:/app"
        
networks:
    internal:
```

ja käynnistetään järjestelmä käskyllä:

```
$ docker-compose up -d --build
```

Lokia voi seurata käskyllä:

```
$ docker-compose logs -f
```
(keskeyttäminen painamalla Ctrl+C). Tässä vaiheessa voi taas tarkastaa, että
yllä mainitut verkko-osoitteet ovat toiminnassa. Docker-compose sammutetaan
käskyllä

```
$ docker-compose down
```

Tästä on jo nyt kaksi etua. Ensinnäkin palveluiden käynnistäminen ja
sammuttaminen tapahtuvat melko yksinkertaisin käskyin ja lisäksi, jos
`docker-compose.yml`-tiedoston sisältöä muuttaa, voidaan muutokset saattaa
heti voimaan käskyllä

```
$ docker-compose up -d --remove-orphans
```
sammuttamatta palvelua välillä. Laaditaan palveluun uusi verkko-osoite `/x`,
johon lähetetty lomake aikaansaa virhetilanteen.
Tällöin palvelu käynnistyy uudelleen.

```javascript
app.post('/x', (req, res) => {
    process.exit(1);
});
```

```
$ curl -XPOST http://localhost:3000/x
curl: (52) Empty reply from server
```

ja lokissa:

```
$ docker-compose logs -f
Attaching to node-dev_node-dev_1
node-dev_1  | 
node-dev_1  | > node-dev@0.0.1 start
node-dev_1  | > node server.js
node-dev_1  | 
node-dev_1  | Sovellus vastaa portissa 3000.
node-dev_1  | npm ERR! code 1
node-dev_1  | npm ERR! path /app
node-dev_1  | npm ERR! command failed
node-dev_1  | npm ERR! command sh -c node server.js
node-dev_1  | 
node-dev_1  | npm ERR! A complete log of this run can be found in:
node-dev_1  | npm ERR!     /root/.npm/_logs/2020-12-29T19_55_21_836Z-debug.log
node-dev_1  | 
node-dev_1  | > node-dev@0.0.1 start
node-dev_1  | > node server.js
node-dev_1  | 
node-dev_1  | Sovellus vastaa portissa 3000.
```

### Useampi palvelu `docker-compose`:lla

Tämä on vieläkin merkittävämpi `docker-compose`:n vahvuus kuin edelliset
esimerkit ja tyypillisin käyttötapaus myös. `docker-compose`:lla on mahdollista
laatia useamman palvelun kokonaisuus, jossa palvelut kommunikoivat toistensa
kanssa sisäverkossa ja käynnistyvät siinä järjestyksessä, mistä ovat
riippuvaisia. Jotta esimerkkiin ei laitettaisi liikaa omia muita teknologioita,
esitellään klassinen ratkaisu, jossa on Wordpress-julkaisualusta ja sen
tietokantana MySQL. Voidaan kirjoittaa seuraavanlainen `docker-compose.yml`:

```docker-compose
version: '3'

services:

  wordpress:
    image: wordpress
    restart: always
    depends_on:
      - db
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    ports:
      - 8080:80
    volumes:
      - wordpress:/var/www/html

  db:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
      MYSQL_DATABASE: wordpress
    ports:
      - 13306:3306
    volumes:
      - db:/var/lib/mysql

volumes:
  wordpress:
  db:
```

Tässä määritellään 2 palvelua, wordpress ja sitä tukeva MySQL-tietokanta.
Lisäksi määritellään 2 virtuaalilevyasemaa, `wordpress` ja `db`, jotka
sisältävät sivuston ja sen tietokannan, tässä järjestyksessä. Emme halua
näiden tietojen hukkuvan palvelun uudelleenkäynnistyksen yhteydessä! Kun
tämä palvelu käynnistetään:

```
$ docker-compose up -d
$ docker-compose logs -f
...
```
sillä menee jonkin aikaa alustaa tietokanta ja käynnistyä ensimmäisellä
kerralla, mutta sen jälkeen aina kun palvelu on päällä, voidaan mennä
osoitteeseen

* http://localhost:8080/wp-admin

ja kirjoittaa uutta sisältöä sivustolle niin hyvin kuin WordPress-taidot
vain kantavat. Jos olet kloonannut tämän kurssin git-repositoryn, esimerkki
on hakemistossa `/tsl-wordpress`.

## Yhteenveto

### Lisätietoa

* https://docs.docker.com/compose/
* https://kubernetes.io/docs/home/
* https://docs.okd.io/latest/welcome/index.html
