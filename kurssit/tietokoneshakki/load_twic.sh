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
