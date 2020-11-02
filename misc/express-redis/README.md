# Express-Redis

## Yleistä

Esimerkki `docker-compose`-palvelusta, jossa ajetaan
Express-verkkosivupalvelinta ja Redis-tietokantaa rinnakkain.
Redis-tietokantaan tallennetaan verkkosivulla käyntien lukumäärä.

## Esivaatimukset

- `curl`
- `docker`
- `docker-compose`
- `node.js`

## Ajaminen

```
$ docker-compose up -d --build
```

## Lokien seuraaminen

```
$ docker-compose logs -f
```

## Verkkosivulla käynti

* http://localhost:3000/mika/tahansa/polku

## Express-palvelimen uudelleenkäynnistymisen aikaansaaminen:

```
$ curl -XPOST http://localhost:3000/crash
```
