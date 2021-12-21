# Shakkipeliympäristön asentaminen tietokoneelle

## Yleistä

Tämän kurssin tarkoituksena *ei ole* opetella pelaamaan shakkia, vaan sitä varten on tutustuttava esimerkiksi verkosta löytyviin muihin kursseihin tai [shakin sääntöihin ja määräyksiin](https://www.shakkiliitto.fi/shakin-kilpailumaaraykset-suomessa/). Sen sijaan kurssin tarkoituksena *on* opastaa tietokoneen käyttäjä asentamaan koneella ohjelmistot, jotka mahdollistavat

* Shakin pelaamisen verkossa Free Internet Chess Server-palvelimella
* Shakkipelien analysoinnin tehokkaalla shakkitietokoneohjelmalla
* Shakin pelaamisen tehokasta shakkitietokoneohjelmaa vastaan

Lisäksi käsitellään menetelmät mestaripelien lataamiseksi verkosta ja avauskirjastojen generoiminen niistä Polyglot-ohjelmalla shakkitietokoneohjelman hyödynnettäväksi.

### Tärkeitä linkkejä ja asennettavia ohjelmia

* [Winboard (Microsoft Windows-järjestelmiin)](https://www.gnu.org/software/xboard/)
* [XBoard (GNU/Linux-järjestelmiin)](https://www.gnu.org/software/xboard/)
* [Scid vs. PC (analysointityökalu)](http://scidvspc.sourceforge.net/)
* [Polyglot (Universal Interface for Chess-sovitin)](https://github.com/ulthiel/polyglot)
* [Stockfish (Eräs maailman parhaita shakkitietokoneohjelmia kirjoitushetkellä)](https://stockfishchess.org/)
* [Free Internet Chess Server](https://www.freechess.org/)
* [The Week In Chess](https://theweekinchess.com/)

Debian-pohjaisissa GNU/Linux-järjestelmissä on mahdollista automaattisesti asennella ainakin seuraavat ohjelmat komentoriviltä:

```bash
sudo apt-get install xboard polyglot stockfish wget
```

Paketti `scid` on myös olemassa, mutta se on olennaisesti huonompi kuin Scid vs. PC, joten alkeellisempaa `scid`:iä tulee välttää ja asentaa Scid vs. PC manuaalisesti verkkosivuston ohjeiden mukaan.

## Shakin pelaaminen verkossa Free Internet Chess Server:issä

### GNU/Linux-järjestelmät

Asenna `xboard` ja luo seuraavanlainen komentotiedosto

#### `fics.sh`

```bash
#!/bin/sh

xboard -ics -icshost freechess.org
```

Tee siitä ajettava käskyllä `chmod 755 fics.sh` ja halutessasi pelata, anna käsky

```bash
./fics.sh
```

Tällöin sinun on syötettävä [Free Internet Chess Server:issä](https://www.freechess.org/) luomasi käyttäjätunnus ja salasana. Tutustu myös kyseisen palvelimen omiin ohjeisiin.

### Microsoft Windows-järjestelmät

Asenna `Winboard` ja noudata [Free Internet Chess Server:in](https://www.freechess.org/) ohjeita liittyäksesi palvelimelle `freechess.org`.

## Shakkipelien analysointi Scid vs. PC:ssä

Käynnistä Scid for PC ohjeiden mukaan ja mene kohtaan Tools->Analysis Engines. Lisää sinne Stockfish seuraavanlaisin parametrein:

* Name: Stockfish
* Command: polku Stockfishiin, esim. /usr/games/stockfish
* Directory: .
* Protocol: UCI (tärkeää)

Lataa haluamasi peli File->Open ja valitse Analysis->Engines->Stockfish->Start. Oikeanpuolimmaisessa paneelissa pitäisi sen jälkeen näkyä Stockfishin analyysit pelistäsi.

## Polyglot-avauskirjaston luonti

Tämän osan voi kokematon sivuuttaa, koska olemme ladanneet valmiin lopputuloksen verkkosivullemme.

* [book.bin](book.bin)

### Shakkipelien lataaminen verkosta

Ei luoda mahdottoman suurta avauskirjastoa, joten tyydytään ottamaan kirjoitushetkellä 5-6 viimeisintä TWIC:n numeroa. Ne voi ladata Linux-järjestelmässä tai Windows:in Cygwin:issä seuraavanlaisella komentotiedostolla:

#### `load_twic.sh`
```bash
#!/usr/bin/env bash

START=1410
END=1415

mkdir tmp
cd tmp

for ((i=$START; i<=$END; i++)) do
    wget "http://theweekinchess.com/zips/twic"$i"g.zip";
done

for i in twic*.zip; do
    unzip $i;
done

for i in twic*.pgn; do
    cat $i >> ../book.pgn;
done

cd ..
rm -rf tmp/
```
Ne, joissa on hakkerin vikaa voivat tehdä tästä omia versioitaan päivittämällä `for`-silmukan lukuja `START` ja `END`, tätä ei tarvitse toistaa joka päivä, joten emme ole jaksaneet parametrisoida tätä komentotiedostoa sen paremmin. Tämän ajamisen jälkeen käytössä on `book.pgn`-niminen noin 24 megatavun shakkipelilistaus selväkielisenä.

### Tiedoston käsittely PolyGlot:issa

Tiedosto voidaan muuntaa PolyGlot-avauskirjastoksi käskyllä:
```bash
polyglot make-book -pgn book.pgn -bin book.bin
```
Tiedostoa saattaa joutua sanitoimaan yhden tai kahden pelin osalta.

## Pelaaminen XBoardissa tietokonetta vastaan

### Ilman avauskirjastoa

Pelaaminen Stockfish-shakkitietokoneohjelmaa vastaan ilman avauskirjastoa niin, että alussa käytössä on 15 minuuttia ja joka siirtoa kohti saa 10 sekuntia lisää, tapahtuu seuraavanlaisella käskyllä:

```bash
xboard -fUCI -fcp stockfish
```

### Avauskirjaston kanssa

Jos kuitenkin tietyssä hakemistossa on PolyGlot:in vaatima kirjasto [`book.bin`](book.bin), se voidaan ottaa käyttöön käskyllä

```bash
xboard -fUCI -fNoOwnBookUCI -sNoOwnBookUCI -fcp stockfish
```

Tällöin tietokoneohjelma käyttää generoitua avauskirjastoa niin pitkälle kuin sen mielestä siellä on hyviä siirtoja.
