#!/bin/bash
git branch -D gh-pages &&
git branch gh-pages &&
git checkout gh-pages &&
mv deployment-ignore.txt .gitignore
yarn build
live-server
