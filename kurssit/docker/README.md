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

### Windows-käyttöjärjestelmät

https://docs.docker.com/docker-for-windows/install/

### Linux-käyttöjärjestelmät

https://docs.docker.com/engine/install/

Huomaa, että monissa Linux-järjestelmissä Docker-Compose on asennettava
erikseen!

### Mac OS-käyttöjärjestelmät

https://docs.docker.com/docker-for-mac/install/

## 2. OPPITUNTI: Levykuvan (`image`) lataaminen ja yksinkertaisen palvelun (`container`) käynnistys

Alkeisesimerkki:
```
$ docker run hello-world
```

```
$ docker run -d --name httpd -p 8080:80 httpd
```
Selain osoitteeseen

http://localhost:8080

```
$ docker container rm -f httpd
```
Palvelu on sammutettu.

## 3. OPPITUNTI: Omien levykuvien laatiminen sekä virtuaalilevyasemat (`volume`)

## 4. OPPITUNTI: Useiden palveluiden yhdistäminen `docker-compose`:lla

## Yhteenveto

### Lisätietoa

* https://docs.docker.com/compose/
* https://kubernetes.io/docs/home/
* https://docs.okd.io/latest/welcome/index.html
