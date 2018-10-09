#!/bin/bash

# build product
#npm run build

localPath=".mrmaster"
alias gitC='git -C $localPath'

if [[ ! -d $localPath ]];then
    mkdir $localPath
    git clone git@github.com:debugly/mr-zone.git $localPath
else
    echo "git pull .."
    gitC pull origin master
fi

cp=$PWD
cd $localPath
git rm -r *
cd $cp

cp -r dist/* $localPath

gitC add --all
gitC commit -m "$(date +'updated:%Y-%m-%d %H:%M:%S')"
gitC push origin master