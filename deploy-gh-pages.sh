git add --a &&
git commit -m 'deploy' &&
git push -f --set-upstream origin gh-pages &&
git checkout master
