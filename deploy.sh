#!/bin/bash
set -e
# changelog
npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0
git add .
git ci -m 'docs: update changelog'
# update version
npx standard-version

# push to github
# auto publish to npm
# git push origin release

