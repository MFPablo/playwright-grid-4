#!/bin/sh

x=1
while [ $x -le 2 ]
do
  yarn test load-test.spec.ts --workers=100 >> logfile
  sleep 50s
  kubectl delete pods --all >> podslogs
  sleep 1m
  x=$(( $x + 1 ))
done