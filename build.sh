#!/bin/sh
grunt --verbose
LAST_BYTES=$(cat last_bytes)
FILE_BYTES=$(wc -c bin/game.html | awk '{print $1}')
BYTES_DIFF=$(($FILE_BYTES - $LAST_BYTES))
echo "$LAST_BYTES -> $FILE_BYTES bytes"
echo "Change: $BYTES_DIFF";

echo "$FILE_BYTES" > last_bytes
