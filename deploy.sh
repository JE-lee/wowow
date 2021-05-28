#!/bin/bash
function current_branch () {
    local folder="$(pwd)"
    [ -n "$1" ] && folder="$1"
    git -C "$folder" rev-parse --abbrev-ref HEAD | grep -v HEAD || \
    git -C "$folder" describe --exact-match HEAD || \
    git -C "$folder" rev-parse HEAD
}

set -e
if [[ `current_branch` != 'release' ]]
then
  echo 'publish fail! you should checkout into release!'
  git checkout release
  # exit -1
fi

git merge master

# changelog
npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0
git add .
git ci -m 'docs: update changelog'
# update version
npx standard-version

# push to github
# auto publish to npm
git push origin release

git checkout master
git merge release
git push origin master

