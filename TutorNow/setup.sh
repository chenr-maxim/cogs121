#!/bin/bash
(which meteor>/dev/null)
hasMeteor=$?
if [ $hasMeteor -eq "1" ]
  then
    echo "Meteor is not installed"
    exit 1
fi
(which ionic>/dev/null)
hasIonic=$?
if [ $hasIonic -eq "1" ]
  then
    echo "Ionic is not installed"
      exit 1
fi
npm install
npm run meteor-client:bundle
echo "Finished"
