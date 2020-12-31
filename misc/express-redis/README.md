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

Valitsimen `--build` voi jättää pois, mikäli palveluun `express` ei ole tehty
muutoksia eikä sitä tarvitse kääntää uudelleen.

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

## Palvelun sammuttaminen

```
$ docker-compose down
```