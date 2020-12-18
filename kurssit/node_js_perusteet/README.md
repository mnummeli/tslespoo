<head>
  <meta charset="UTF-8"/>
  <style>
    body {
      max-width: 800px;
      margin: auto;
    }
  </style>
</head>

# Ohjelmoinnin perusteet Node.js -Javascriptillä

&copy; 2018-2020, Mikko Nummelin

## Yleistä

Tämä on Työväen Sivistysliiton Espoon ja Kauniaisten opintojärjestön
kurssimateriaali ohjelmoinnin perusteisiin Javascriptin Node.js-murteella.
Kurssin tarkoitus on tutustuttaa oppilaat ohjelmoinnin perusrakenteisiin
kuten alkeellisiin matemaattisiin laskutoimituksiin, syötteeseen ja
tulosteisiin sekä ehtolauseisiin, silmukoihin, moduuleihin ja tietovuon
käsitteeseen. Kurssilla on joitakin harjoitustehtäviä ja esimerkkejä.

*Kurssi toimii myös valmentavana materiaalina opiskelijoille, jotka aikovat
hakea työharjoittelupaikkaa Javascript-projekteissa tietotekniikan alan
yrityksissä!*

## Historiaa (mikä on Javascript ja mikä on Node.js?)

Javascript on ohjelmointikieli, joka kehitettiin Netscape Navigator-selainta
varten 1990-luvun alkupuolella. Uuden kielen tarkoituksena oli mahdollistaa
dynaamisten verkkosivujen, joilla on muuttuvaa sisältöä, laatiminen.
Nimen valintaan vaikutti samanaikaisesti Sun Microsystemsillä kehitteillä
ollut, mutta eri ohjelmointikieli Java. Javascript muistuttaa jossakin
määrin vanhempia C, C++ ja FORTRAN-kieliä. Nykyään Javascriptin
standardinmukainen virallinen nimi on ECMAScript, mutta arkipuheessa tätä
uutta nimeä käytetään harvemmin.

Node.js on myöhempi Javascriptin murre, joka on kehitetty toimimaan
palvelinohjelmistojen kirjoittamisessa eikä pelkästään selaimessa. Node.js:n
pohjana on tosin Google Chrome-selaimessa käytössä oleva V8-niminen
Javascript-tulkki. Useissa Node.js-ohjelmissa suositaan ns. funktionaalista
ohjelmointitapaa, jolloin funktiot voivat saada parametreikseen toisia
funktioita ja kutsua niitä sen sijaan, että palauttaisivat välittömästi
jonkun paluuarvon.

## Hyödyllisiä linkkejä

Seuraavat linkit kannattaa laittaa selaimesi kirjanmerkkeihin. Niiden alta
löytyy sekä yleistä tietoa Javascriptistä, että myös Node.js:ään liittyviä
erityishuomioita.

* https://www.w3schools.com/js/default.asp
* https://developer.mozilla.org/bm/docs/Web/JavaScript
* https://nodejs.org/dist/latest-v8.x/docs/api/

## 1. OPPITUNTI: Git:in ja Node.js:n asennus ja asennusten varmistaminen

#### Tehtävä 1.1. (Gitin asentaminen ja kurssimateriaalin lataaminen verkosta omalle koneelle)

### Microsoft Windows-järjestelmät
![Microsoft Windowsin logo][mswindows]

Lataa tietokoneellesi Git osoitteesta https://git-scm.com/download/win ja
noudata asennusohjeita. Avaa sen jälkeen komentokehote ja lataa
kurssimateriaali kirjoittamalla:

```
C:\> git clone https://github.com/mnummeli/node_js_perusteet.git
```

### Linux-järjestelmät
![Linuxin logo][linux]

Jos sinulla on Debian-pohjainen Linux-järjestelmä, asenna Git komennolla:

```
$ sudo apt-get update
$ sudo apt-get install git gitk
```

Jos sen sijaan sinulla on RedHat-pohjainen Linux-järjestelmä, asenna Git
komennolla

```
$ sudo yum -y update
$ sudo yum -y install git gitk
```

Lataa kurssimateriaali omalle tietokoneellesi käskyllä:

```
$ git clone https://github.com/mnummeli/node_js_perusteet.git
```

#### Tehtävä 1.2. (Node.js:n asentaminen)

Valitse alta oikea asennusohje tietokoneesi käyttöjärjestelmän mukaan ja
suorita asennus. Molempien järjestelmien Node.js-paketit löytyvät osoitteesta

https://nodejs.org/en/

### Microsoft Windows-järjestelmät
![Microsoft Windowsin logo][mswindows]

Lataa ylempänä mainitulta Node.js:n verkkosivulta uusin stabiili versio,
joka on merkitty LTS (eng. long term support, suom. pitkäaikaisesti tuettu)
-kirjainyhdistelmällä. Mene sen jälkeen kansioon `Downloads` ja tuplaklikkaa
hiirellä asennuspakettia. Asennusohjelman pitäisi käynnistyä ja asennuksen
sujua kuten muidenkin Microsoft Windows-ohjelmien asennuksen.

#### Tehtävä 1.3. (Node.js:n testaaminen Microsoft Windows-järjestelmässä)

Avaa komentokehote ja tarkasta, että `node` ja `npm` on asennettu oikein:

```
C:\> node --help
(tuloksena pitäisi olla Node.js:n ohjeita)

C:\> npm --help
(tuloksena pitäisi olla npm-paketinhallintaohjelman ohjeita)
```

Kokeile käyttää Node.js:ää yksinkertaisena laskimena:

```
C:\> node                                              
> 1+2
3
> let a=Math.sqrt(2)
undefined
> a
1.4142135623730951
> a*a
2.0000000000000004
> process.exit(0)
C:\>
```

### Linux-järjestelmät
![Linuxin logo][linux]

Lataa ylempänä mainitulta Node.js:n verkkosivulta uusin stabiili versio,
joka on merkitty LTS (eng. long term support, suom. pitkäaikaisesti tuettu)
-kirjainyhdistelmällä. Ladattuasi node.js-paketin kansioon `~/Lataukset/`,
luo kotihakemistoosi kansio `~/apps/`, pura paketti sinne ja määrittele
tarvittavat ympäristömuuttujat `~/.bashrc`-alustustiedostosi lopussa:

Kotihakemistossasi:

```
$ mkdir apps
$ cd apps
$ tar xf ~/Lataukset/node-<VERSIO>.tar.xz
$ ln -s node-<VERSIO> node
```

`.bashrc`-tiedoston loppupuolelle tekstieditorilla, toki soveltaen,
jos sinulla on ennestään omia `PATH`-määrityksiä siellä:

```
export NODE_HOME=${HOME}/apps/node
export PATH=${NODE_HOME}/bin:${PATH}
```

Muutokset tulevat voimaan kun seuraavan kerran avaat istunnossa
`bash`-komentorivikehotteen sisältävän konsolin.

#### Tehtävä 1.3. (Node.js:n testaaminen Linux-järjestelmässä)

Tarkasta, että `node` ja `npm` on asennettu oikein:

```
$ which node
/home/<KÄYTTÄJÄTUNNUS>/apps/node/bin/node

$ which npm
/home/<KÄYTTÄJÄTUNNUS>/apps/node/bin/npm
```

Kokeile käyttää Node.js:ää yksinkertaisena laskimena:

```
$ node                                              
> 1+2
3
> let a=Math.sqrt(2)
undefined
> a
1.4142135623730951
> a*a
2.0000000000000004
> process.exit(0)
$
```

## 2. OPPITUNTI: Tulostus ja syöte

Nyt kun Node.js on onnistuneesti asennettu, voidaan alkaa kirjoittaa
varsinaisia ohjelmatiedostoja. Avaa sopiva tekstinkäsittelyohjelma, esimerkiksi
Windowsissa Notepad tai Notepad++ tai Linuxissa Kate, GEdit, Emacs tms.
ja tee seuraavanlainen ohjelmatiedosto, jonka nimeksi laitetaan `hei.js`:

```javascript
#!/usr/bin/env node

'use strict';

console.log(`Hei maailma.`);
```

Ylin rivi on tarpeellinen vain Linux-järjestelmissä. Se kertoo, että jos
kyseinen tiedosto on määritelty ajettavaksi, se voidaan suorittaa pelkästään
käskyllä

```
$ ./hei.js
Hei maailma.
```
monimutkaisemman

```
$ node hei.js
Hei maailma.
```
sijasta. Tosin Windowsissa on joka tapauksessa käytettävä muotoa

```
C:\javascript_koodit\> node hei.js
Hei maailma.
```

Jatkossa laitamme kuitenkin varmuuden vuoksi jokaisen Node.js-kielisen
tiedoston alkuun:

```
#!/usr/bin/env node

'use strict'

... muu koodi tähän
```

Kuten ajaessa ohjelmaa huomattiin, `console.log` tulostaa annetun tekstin
sellaisenaan konsoliin.

### Syöte ohjelman parametreista

Tehdään ohjelma `tervehdys.js`, joka ottaa parametrikseen nimen ja tulostaa sen
tervehdyksessä:

```javascript
#!/usr/bin/env node

'use strict'

const nimi = process.argv[2];
console.log(`Hei ${nimi}.`);
```
Ajettaessa:

```
$ node tervehdys.js Mestariohjelmoija
Hei Mestariohjelmoija.
```
se tulostaa ensimmäisen sille annetun parametrin. `process.argv` on lista,
joka sisältää ensin ajetun ohjelman koko nimen, sitten kyseisen ohjelman
tiedoston ja sen jälkeen loput komentorivillä annetut argumentit. Palaamme
tähän myöhemmin silmukoiden yhteydessä.

Mitä, jos unohdamme antaa parametrin ja ajamme ohjelman vain tällä tavoin?

```
$ node tervehdys.js
Hei undefined.
```
Havaitsemme, että nyt `process.argv`:n alkio numero 2 ei ole määritelty ja
tulosteeseen tulee `undefined`.

#### `const` ja `let`-käskyjen ero

Olemme tähän mennessä määritelleet muuttujia joko tyylillä
```
let a=Math.sqrt(2);
```
tai
```
const nimi = process.argv[2];
```
Molemmat määrittelevät muuttujan ja sen arvon, mutta niiden erona on se, että
`let`-käskyllä annetun muuttujan arvo voi myöhemmin vaihtua, mutta
`const`-käskyllä määritellyn muuttujan arvo on pysyvä eikä sitä voi vaihtaa.
Esimerkiksi:

```
$ node
> let a=0
undefined
> a
0
> a=5
5
> a
5
> const b=6
undefined
> b
6
> b=7
TypeError: Assignment to constant variable.
> process.exit(0)
```

#### Lisätietoa

Lisätietoa löytyy osoitteista:

* https://nodejs.org/dist/latest-v8.x/docs/api/console.html
* https://nodejs.org/dist/latest-v8.x/docs/api/process.html

#### Tehtävä 2.1. (Kaksi parametria)

Tee ohjelma, joka ottaa kaksi parametria ja tervehtii molempia seuraavasti:

```
$ node kaksiparametria.js Mestariohjelmoija Huipputestaaja
Hei Mestariohjelmoija.
Hei Huipputestaaja.
```
Vihje: toinen parametri saadaan samasta `process.argv`-listasta alkiosta numero
3, s.o. `process.argv[3]`.

## 3. OPPITUNTI: Ehtolauseet

Usein ohjelmissa täytyy pystyä toimimaan eri tavalla riippuen siitä, mitä
syötteitä se on saanut. Esimerkiksi seuraava ohjelma:

```javascript
#!/usr/bin/env node

'use strict'

const luku = parseInt(process.argv[2], 10);
if(luku >= 0 && luku <= 5) {
  console.log(`Syöttämäsi luku ${luku} on välillä 0-5.`);
} else {
  console.log(`Syöttämäsi luku ${luku} ei ole välillä 0-5.`);
}
```
kertoo käyttäjälle, oliko annettu kokonaisluku väliltä 0-5 seuraavasti:

```
$ ./nollanjaviidenvalilla.js 1
Syöttämäsi luku 1 on välillä 0-5.
$ ./nollanjaviidenvalilla.js 13
Syöttämäsi luku 13 ei ole välillä 0-5.
$ ./nollanjaviidenvalilla.js -1
Syöttämäsi luku -1 ei ole välillä 0-5.
```
Käskyä `parseInt` jouduttiin käyttämään, koska `process.argv[2]` on
merkkijono ja syöte haluttiin muuntaa kokonaisluvuksi.

#### Lisätietoa

Lisätietoa löytyy osoitteesta:

* https://developer.mozilla.org/bm/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

#### Tehtävä 3.1. (Parilliset ja parittomat luvut)

Tee ohjelma, joka kertoo, onko annettu luku parillinen vai pariton. Luku on
parillinen, jos se on jaollinen 2:lla, eli ehto `n%2===0` pätee.
Ohjelman tulee toimia seuraavasti:

```
$ node parillinen.js 5
Luku 5 on pariton.
$ node parillinen.js 8
Luku 8 on parillinen.
$ node parillinen.js 12
Luku 12 on parillinen.
```

#### Tehtävä 3.2. (Karkausvuosi)

Tee ohjelma, joka kertoo, onko annettu vuosi karkausvuosi. Vuosi on yleensä
karkausvuosi, jos se on jaollinen neljällä. Kuitenkaan sadalla jaolliset
vuodet eivät ole karkausvuosia, mutta toisaalta neljälläsadalla jaolliset
vuodet kuitenkin ovat. Ohjelman kuuluu toimia seuraavasti:

```
$ node karkausvuosi.js 1800
Vuosi 1800 ei ole karkausvuosi.
$ node karkausvuosi.js 1984
Vuosi 1984 on karkausvuosi.
$ node karkausvuosi.js 1993
Vuosi 1993 ei ole karkausvuosi.
$ node karkausvuosi.js 2000
Vuosi 2000 on karkausvuosi.
```

Vihje: Neljällä ja muillakin luvuilla jaollisuus voidaan testata `%`-operaattorilla:

```
$ node
> 5%4
1
> 3%4
3
> 4%4
0
> 103%100
3
```
eli esimerkiksi luku `x` on neljällä jaollinen silloin kun `x%4===0`.

## 4. OPPITUNTI: Silmukat

Joskus on syytä kyetä toistamaan sama tai samantapainen asia useamman kerran,
tällöin kyseeseen tulevat silmukat. Silmukoita ovat esimerkiksi `while` ja
`for`-silmukat. Seuraava ohjelma ottaa komentoriviltä parametrin ja tulostaa
luvut nollasta annettuun lukuun asti:

```javascript
#!/usr/bin/env node

'use strict'

const luku = parseInt(process.argv[2], 10);

let i=0;
while(true) {
  if(i>luku) {
    break;
  }
  console.log(i);
  i++;
}
```

`while(true)` tarkoittaa, että sen jälkeen olevaa lohkoa toistetaan periaatteessa
loputtomiin. Käytännössä lohkon suoritus katkeaa, kun annetaan `break`-käsky.
Sama ohjelma voitaisiin kirjoittaa lyhyemmin joko laittamalla `while`-käskyyn
toistoehto tai käyttämällä `for`-silmukkaa. Molemmat vaihtoehdot on esitetty
alla:

```javascript
#!/usr/bin/env node

'use strict'

const luku = parseInt(process.argv[2], 10);

let i=0;
while(i<=luku) {
  console.log(i);
  i++;
}
```

Tässä siis `while(ehto)` toistaa lohkoa niin kauan kuin ehto on voimassa.

```javascript
#!/usr/bin/env node

'use strict'

const luku = parseInt(process.argv[2], 10);

for(let i=0; i<=luku; i++) {
  console.log(i);
}
```

Ja tässä lyhyimmässä muodossa käytetään `for`-silmukkaa.
`for(alustus;ehto;päivitys)` on tehty korvaamaan tavanomaisimpia tapoja,
miten `while`-silmukkaa käytetään yleensä.

#### Tehtävä 4.1. (`#`-merkkejä)

Käsky `process.stdout.write` tulostaa annetun tekstin kuten `console.log`, mutta
ilman rivinvaihtoa. Tee ohjelma, joka ottaa vastaan syötteenä numeron ja
tulostaa annetun määrän `#`-merkkejä peräkkäin. Jos syötetty luku on yli
kaksikymmentä, tulee tulostaa *virhekonsoliin* käskyllä `console.error`
teksti `Syötit liian suuren luvun.`

#### Tehtävä 4.2. (Sisäkkäiset `for`-silmukat ja ehdot)

Seuraava ohjelma:

```javascript
#!/usr/bin/env node

'use strict'

const luku = parseInt(process.argv[2], 10);

for(let i=0; i<luku; i++) {
  for(let j=0; j<luku; j++) {
    if(i==j || i==luku-j-1) { // MUOKKAA TÄTÄ
      process.stdout.write('#');
    } else {
      process.stdout.write(' ');
    }
  }
  console.log();
}
```
tulostaa annetun kokoisen ristin seuraavasti:
```
$ node sisakkainen.js 7
#     #
 #   #
  # #  
   #   
  # #  
 #   #
#     #
```
Muokkaa ohjelmassa olevaa `if`-lauseen ehtoa niin, että ohjelma tulostaisikin
annetun luvun kokoisen neliön kehyksen seuraavasti:
```
$ node sisakkainen.js 5
#####
#   #
#   #
#   #
#####
```

## 5. OPPITUNTI: Funktiot, taulukot ja objektit

Joskus ohjelma on hyödyllistä pilkkoa useampiin palasiin, jos samaa ohjelman
osaa joutuu käyttämään uudelleen ja uudelleen tai sitä halutaan erikseen
testata. On esimerkiksi mahdollista, että haluamme kirjoittaa erikseen funktion
annetun listan summan laskemiseen ja hyödyntää sitä joko komentoriviltä
ajettavassa ohjelmassa tai testissä.

```javascript
#!/usr/bin/env node

'use strict'

function summa(args) {
  let s=0;
  for(let arg of args) {
    console.log(arg);
    s += parseInt(arg, 10);
  }
  return s;
}

// Komentorivi
console.log(`Syöttämiesi lukujen summa on: ${summa(process.argv.slice(2))}`);

// Testi
console.log(`Lukujen 2 ja 3 summa on: ${summa([2,3])}`)
```

Tässä esimerkissä nähdään myös muita funktiokutsuja, kuten `slice`. Tällä
saatiin karsittua komentoriviltä pois muut kuin käyttäjän varsinaisesti syöttämät
argumentit. Samoin annettiin testissä funktiolle `summa` argumenttina taulukko.
Taulukot määritellään Javascriptissä niin, että niissä on hakasulut ja
alkiot pilkuilla eroteltuna. Esille tuli myös `for`-silmukan vaihtoehtoinen
syntaksi `for(let alkio of taulukko)`, jolla saadaan taulukon alkiot käsittelyyn
yksitellen.

Joissakin tapauksissa funktioita voidaan käyttää toisten funktioiden
parametreina, jolloin voidaan esimerkiksi toistaa sama funktio useammalle
taulukon alkiolle tai suodattaa pois taulukon alkioita. Seuraava ohjelma luo
taulukon, kaksinkertaistaa sen alkioiden arvon, suodattaa pois kolmella
jaolliset alkiot ja lopuksi kääntää alkioiden järjestyksen:

```javascript
#!/usr/bin/env node

'use strict';

let taulukko = [];

for(let i=0;i<30;i++) {
    taulukko.push(i);
}

let taulukko2 = taulukko.map(x => {
    return x*2;
});

console.log(JSON.stringify(taulukko2));

let taulukko3 = taulukko2.filter(x => {
    return x % 3 !== 0;
});

console.log(JSON.stringify(taulukko3));

let taulukko4 = taulukko3.sort((x, y) => {
    return y-x;
});

console.log(JSON.stringify(taulukko4));
```

Ohjelman tuloste on seuraava:

```
$ ./muokkaus.js 
[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58]
[2,4,8,10,14,16,20,22,26,28,32,34,38,40,44,46,50,52,56,58]
[58,56,52,50,46,44,40,38,34,32,28,26,22,20,16,14,10,8,4,2]
```

Ohjelmassa esiintyviä ilmaisuja, kuten:

```
(x, y) => {
    return y-x;
}
```

sanotaan *lambda-lauseiksi*. Esimerkiksi yllä oleva lause tarkoittaa lähes
samaa kuin *anonyymi funktio*

```javascript
function(x, y) {
    return y-x;
}
```

### Objektit

Kaikki Javascriptin tietotyypit ovat objekteja. Objekteilla on kuitenkin hyödyllisenä perusominaisuutena se, että se on kokoelma arvo-avainpareja, joista avaimet ovat merkkijonoja tai numeroita ja arvot mitä tahansa muita objekteja. Jos esimerkiksi merkkijono muunnetaan pieniksi kirjaimiksi käskyllä:

```
> "NodeJsPeruskurssi".toLowerCase()
'nodejsperuskurssi'
```

tapahtui niin, että "NodeJsPeruskurssi" oli merkkijonotyyppinen objekti, jolla oli eräänä arvonaan `toLowerCase`-niminen funktio. On myös mahdollista luoda omia objekteja, esimerkiksi:

```
> objekti1.mansikoita=3
3
> objekti1.mustikoita=4
4
> objekti1.vadelmia=10
10
> JSON.stringify(objekti1)
'{"mansikoita":3,"mustikoita":4,"vadelmia":10}'
```

#### Lisätietoa

Lisätietoa löytyy osoitteista:

* https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

#### Tehtävä 5.1. (Funktion hyväksikäyttö neliön tulostuksessa)

Otetaan pohjaksi ylempää risti- ja neliön kehäesimerkkien riisuttu versio,
joka tulostaa täytetyn neliön:

```javascript
#!/usr/bin/env node

'use strict'

const luku = parseInt(process.argv[2], 10);

for(let i=0; i<luku; i++) {
  for(let j=0; j<luku; j++) {
    process.stdout.write('#');
  }
  console.log();
}
```

Tee uusi funktio `risteja(lukumaara)`, joka tulostaa samalle riville annetun
määrän `#`-merkkejä ja rivinvaihdon. Muokkaa sen jälkeen yllä oleva ohjelmasi
muotoon

```javascript
#!/usr/bin/env node

'use strict'

function risteja(lukumaara) {
  // OMA OHJELMASI TÄHÄN!
}

const luku = parseInt(process.argv[2], 10);

for(let i=0; i<luku; i++) {
  risteja(luku)
}
```

joka myös tulostaisi täytetyn neliön `#`-risteistä:

```
$ node risteja.js 4
####
####
####
####
```

## 6. OPPITUNTI: Moduulit ja tietovuot (EventStream)

Jos ohjelmistoprojektit ovat laajoja, ei kaikkea ohjelmakoodia kannata kirjoittaa samaan tiedostoon, vaan ohjelma kannattaa jakaa erikseen *moduuleiksi*. Moduuleista on myös muita hyötyjä, kuten mahdollisuus käyttää sisäänrakennettuja kirjastoja (systeemimoduulit), ulkoisia kirjastoja verkosta tai laatia omia moduuleita. Moduuleita voi myös käyttää uudelleen eri ohjelmissa. Oli moduuli millainen tahansa, se otetaan käyttöön sijoittamalla moduulin arvo muuttujaan, esimerkiksi:

```javascript
const util = require('./util.js');
```

### Systeemimoduulit

Tähän mennessä olemme käsitelleet syötettä komentoriviltä. Teemme kuitenkin nyt ohjelman, joka lukee syötteitä kysymällä peräjälkeen positiivisia lukuja ja kun käyttäjä syöttää luvun `-1`, käsittely loppuu ja ruudulle tulostetaan siihen mennessä annettujen lukujen summa. Tätä varten otetaan käyttöön Node.js:n sisäänrakennettu `readline`-moduuli seuraavasti:

```javascript
#!/usr/bin/env node

/* global process */

'use strict';

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let sum = 0;

// rl on tietovuo, josta kuuntelemme tapahtumia line ja close
rl.on('line', line => {
    // Yritetään muuntaa syöte merkkijonosta desimaaliluvuksi
    const num = parseInt(line, 10);
    if (num < 0) {
        // Jos on syötetty negatiivinen luku, suljemme vuon
        rl.close();
    } else if (num >= 0) {
        // Ei-negatiiviset luvut lisätään summaan, muut kuin numerot hylätään
        sum += num;
    }
}).on('close', () => {
    // Sulkemisen jälkeen suoritetaan tämä koodilohko
    console.log(`Syöttämiesi lukujen summa on: ${sum}`);
});
```

Huomaa, että edellisessä esimerkissä tuli uutena asiana myös *tietovuo*, joka on tavanomainen käsite Node.js-ohjelmoinnissa. Tietovuota käytetään niin, että se luodaan ja *kuunnellaan* sen eri tapahtumia, tässä tapauksessa *line*-tapahtumaa, joka aktivoituu kun on syötetty rivi ja *close*-tapahtumaa, kun tietovuo on sulkeutumassa. Esimerkissä tietovuolle annetaan myös sopivassa tilanteessa sulkemiskäsky `close()`.

#### Lisätietoa

Lisätietoa löytyy osoitteista:

* https://nodejs.org/dist/latest-v12.x/docs/api/modules.html
* https://nodejs.org/dist/latest-v12.x/docs/api/readline.html
* https://nodejs.org/dist/latest-v12.x/docs/api/stream.html

#### Tehtävä 6.1. (Myös negatiiviset luvut mukaan summaan)

Muokkaa yllä olevaa ohjelmaa niin, että myös negatiiviset luvut otetaan mukaan summaan ja summa tulostetaan kun on syötetty jotakin muuta kuin numero, esimerkiksi kirjaimia.

### `npm`:n avulla verkosta asennettavat moduulit

Node.js:n käyttäjäkunta on laaja ja laajenee koko ajan ja harvoin tarvitsee keksiä kaikkia tarvitsemiansa asioita alusta asti itse. `npm` on Node.js:n mukana asentunut ohjelma, joka on lyhenne termistä "Node package manager". Sen avulla voidaan perustaa *Node.js-projekti* ja määritellä, *mitä verkosta asennettavia ylimääräisiä paketteja se tarvitsee*. Seuraavassa esimerkissämme luomme projektin, asennamme `express`-verkkosivupalvelimen ja teemme sille hyvin yksinkertaisen verkkosivun, joka kertoo palvelimen nimen, päivämäärän ja kellonajan.

Aloitetaan luomalla projektihakemisto ja sinne `npm`:n konfiguraatiotiedosto `package.json`.
```bash
$ mkdir express_esimerkki
$ cd express_esimerkki
$ npm init -y
```
Editoidaan luodun `package.json`-tiedoston sisältö seuraavanlaiseksi:
```json
{
    "name": "express_esimerkki",
    "version": "0.0.1",
    "description": "TSL:n Express-esimerkki",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": ["TSL", "express"],
    "author": "TSL:n Espoon ja Kauniaisten opintojärjestö",
    "repository": "http://github.com/mnummeli/tslespoo.git",
    "license": "ISC"
}
```
Suljetaan editori ja asennetaan `express` ja `date-format`:
```bash
$ npm install --save express date-format
```
Tämän jälkeen `package.json`:in sisällön tulisi näyttää seuraavalta:
```json
{
    "name": "express_esimerkki",
    "version": "0.0.1",
    "description": "TSL:n Express-esimerkki",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": ["TSL", "express"],
    "author": "TSL:n Espoon ja Kauniaisten opintojärjestö",
    "repository": "http://github.com/mnummeli/tslespoo.git",
    "license": "ISC",
    "dependencies": {
        "date-format": "^3.0.0",
        "express": "^4.17.1"
    }
}
```
Hakemistoon on myös ilmestynyt uusi alihakemisto `node_modules/`. Siellä sijaitsevat verkosta ladatut apupaketit, jotka yleensä saa aina verkosta uudelleenkin ajamalla `npm install`, joten tehdään tiedosto `.gitignore`, jossa kielletään `node_modules/`:in päätyminen versionhallintaan ja siten säästetään versionhallinnassa tilaa. `.gitignore`:n sisällöksi tulee seuraava:
```
**/*~
node_modules/
```
Tämän jälkeen kirjoitetaan itse palvelimen ohjelmakoodi:

#### `server.js`
```javascript
#!/usr/bin/env node

'use strict';

const app = require('express')();
const format = require('date-format');
const os = require('os');

app.use((req, res) => {
    const ts = new Date();
    res.json({
        'Palvelimen nimi': os.hostname(),
        'Metodi': req.method,
        'Polku': req.path,
        'Päivämäärä': format('dd.MM.yyyy', ts),
        'Kellonaika': format('hh:mm:ss', ts)
    });
});

app.listen(3000);
```

lisätään `package.json`:iin skripti `start`:
```json
"scripts": {
        "start": "node ./server.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
```
ja tämän jälkeen palvelin on ajettavissa käskyllä:
```bash
$ npm start
```
Kun sen jälkeen menee verkkoselaimella osoitteeseen http://localhost:3000/tslespoo , pitäisi lopputuloksen näyttää suunnilleen tältä:
```json
{"Palvelimen nimi":"<KONEESI VERKKONIMI>","Metodi":"GET","Polku":"/tslespoo","Päivämäärä":"12.10.2020","Kellonaika":"20:01:25"}
```
Jos olet kopioinut kurssimateriaalin GitHub:ista koneellesi, valmiit koodit ovat projektin alihakemistossa `/kurssit/node_js_perusteet/express_esimerkki`

#### Lisätietoa

Lisätietoa nyt käytetyistä apupaketeista löytyy seuraavista osoitteista:

* https://expressjs.com/
* https://www.npmjs.com/package/date-format

#### Tehtävä 6.2.

Tutustu Expressin dokumentaatioon ja muunna palvelin sellaiseksi, että jos annetaan GET-pyyntö (yllä oleva `req.method` on `GET`), annetaan sama lopputulos kuin aiemminkin, mutta jos annetaan POST-pyyntö, palvelin sammutetaan `process.exit(0)`-käskyllä.

#### Tehtävä 6.3.

Muunna palvelinta niin, että polusta `/nimi` annetaan vain palvelimen nimi ja polusta `/metodi` vain verkkopyynnön metodi. Muita toiminnallisuuksia palvelimessa ei tarvitse olla.

### Omat moduulit

Omien moduulien luominen on tärkeä taito, koska juuri sillä tavoin on mahdollista jakaa oma ohjelmakoodi useaan tiedostoon ja käyttää samaa koodia uudelleen. Tehdään yksinkertainen moduuli, joka toteuttaa kompleksilukujen kerto- ja jakolaskun. Kompleksiluvut ovat matematiikassa reaalilukujen pareja, joilla on tietyt laskusäännöt. Ne keksittiin kun algebrassa tuli tarve käsitellä negatiivisten lukujen neliöjuuria, jolloin määriteltiin *imaginaariyksikkö* *i*, jolla on ominaisuus: *i* * *i* == -1. Kompleksiluvussa *x* + *iy* on reaali- ja imaginaariosat *x* ja *y* ja näillä voidaan laskea hyödyntäen *i*:n ominaisuutta vaikkapa seuraavasti (1 + *i*)(1 + *i*) = 1 * 1 + 1 * *i* + *i* * 1 + *i* * *i* == 1 + *i* + *i* - 1 = 2 *i*.

Seuraava moduuli toteuttaa kompleksilukujen kerto- ja jakolaskut:

#### kompleksiluvut.js
```javascript
#!/usr/bin/env node

'use strict';

function tulo(z1, z2) {
    return [z1[0] * z2[0] - z1[1] * z2[1],
        z1[0] * z2[1] + z1[1] * z2[0]];
}

function osamaara(z1, z2) {
    const mod2 = z2[0] * z2[0] + z2[1] * z2[1];
    return [(z1[0] * z2[0] + z1[1] * z2[1]) / mod2,
        (-z1[0] * z2[1] + z1[1] * z2[0]) / mod2];
}

module.exports = {tulo, osamaara};
```

Huomaa, että moduulin ulkopuolella käytettäväksi esiteltävät funktiot sijoitetaan objektina `module.exports`-muuttujaan. Moduulia hyödyntävä "asiakasohjelmisto" taas voi olla vaikkapa seuraavanlainen:

#### kompleksiluvut_client.js
```javascript
#!/usr/bin/env node

'use strict';

const {tulo, osamaara} = require('./kompleksiluvut.js');

console.log(tulo([2,0], [3,0]));
console.log(tulo([2,1], [2,-1]));
console.log(tulo([3,0], [3,-1]));
console.log(tulo([2,2], [2,2]));

console.log(osamaara([-1,5],[2,3]));
console.log(osamaara([0,1],[1,1]));
```

Jos nämä sijaitsevat samassa hakemistossa, odotettu lopputulos on:

```
$ ./kompleksiluvut_client.js 
[ 6, 0 ]
[ 5, 0 ]
[ 9, -3 ]
[ 0, 8 ]
[ 1, 1 ]
[ 0.5, 0.5 ]
```

#### Tehtävä 6.4. (Kompleksilukujen yhteen- ja vähennyslasku)

Laajenna moduulia lisäämällä `kompleksiluvut.js`:ään funktiot kompleksilukujen yhteen- ja vähennyslaskulle, lisää nämä esiteltäviin funktioihin ja laadi muutamia esimerkkikäskyjä niiden käytöstä `kompleksiluvut_client.js`-ohjelmaan.

## Yhteenveto

Kurssin suoritettuasi olet oppinut Node.js:n ja Javascriptin tärkeitä perusteita. Osaat lukea syötteitä ja tulostaa merkkijonoja, samoin kuin suorittaa alkeellisia laskutoimituksia. Mikä tärkeämpää, hallitset ehtolauseet ja silmukat, jotka ovat ohjelmoinnin ehdottomia perustoimintoja. Lisäksi osaat tehdä omia funktioita, jolloin voit käyttää uudelleen tärkeitä osia ohjelmastasi ilman, että samaa ohjelmakoodia tarvitsee toistaa. Olet myös tehnyt pintaraapaisun dynaamisen ohjelmoinnin alkeisiin kun olet antanut funktioita parametreiksi toisille funktioille.

Kuten kaikissa oppimisprosesseissa, tie ammattilaismaiseen osaamiseen on pitkä, mutta tärkeintä on päästä alkuun, saada kiinnostus heräämään ja kokea saavansa aikaan hyödyllisiä aikaansaannoksia itse. Verkko on pullollaan Javascriptin ja Node.js:n jatko-opiskeluun tarvittavia resursseja. Jos olet erityisen kiinnostunut Node.js:stä, seuraavaksi todennäköisesti haluat oppia *moduulit*, *vuot* (Event streams) ja lisää dynaamisesta ohjelmoinnista. Jossakin vaiheessa kiinnostunet myös Javascriptistä *verkkosivujen kehittämisessä*, jolloin on tärkeää oppia HTML, dokumenttipuu (document object model), CSS (tyylitiedostot) ja Javascript-käskyt, joilla näitä muokataan. Browserify on ohjelmisto, joka auttaa muokkaamaan Node.js-projekteja verkkosivuilla suoraan käytettäviksi.

Onnea opiskeluun!

### Lisätietoa

* https://nodeschool.io/fi/#workshopper-list

[mswindows]: kuvat/mswindows.jpg
[linux]: kuvat/linux.jpeg
