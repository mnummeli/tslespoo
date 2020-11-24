# Yksinkertainen esimerkki uudelleenkäynnistyvästä node.js-projektista

## Käynnistäminen

`docker-compose up -d --build`

## Päivittäminen

Kun ohjelmakoodia tiedostossa `server.js` päivitetään, muutokset näkyvät heti.
Palvelin myös käynnistyy heti, jos se sammuu välillä virhetilanteeseen.

## Lokien seuraaminen

`docker-compose logs -f`

## Tilapäinen palvelun sammuttaminen

Tämän jälkeen palvelun tulisi käynnistyä uudelleen:

`curl -XDELETE localhost:3000`

## Sammuttaminen

`docker-compose down`

## Verkkosivu

http://localhost:3000
