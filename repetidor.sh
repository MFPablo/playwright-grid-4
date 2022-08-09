#!/bin/sh

x=1
echo "Inicio:" $(date)
while [ $x -le 3 ]
do
  yarn test load-test.spec.ts --workers=100 >> logfile
  sleep 8m
  x=$(( $x + 1 ))
done
echo "Finalizado:" $(date)


