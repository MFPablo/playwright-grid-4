#!/bin/sh

x=1
echo "Start:" $(date)
while [ $x -le 3 ]
do
  echo -e "Run N°:\t" $x "\nStart:\t" $(date +%T)
  yarn test load-test.spec.ts --workers=100 >> logfile
  sleep 5m 30s
  x=$(( $x + 1 ))
done
echo "Finish:" $(date)


