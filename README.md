# node-init

This is a node init repo.

To use it, I have an alias in my [zsh](http://ohmyz.sh/) config that executes the following commands

```sh
git clone git@github.com:Knorcedger/node-init.git . && rm -rf .git && git init && npm init -y \
  && ni express body-parser winston \
  && nisd eslint eslint-config-airbnb-base eslint-plugin-import nodemon \
  && npx json -I -f package.json -e "this.scripts.start=\"nodemon --inspect --experimental-modules\"" \
  && npx json -I -f package.json -e "this.scripts.test=\"npm run eslint\"" \
  && npx json -I -f package.json -e "this.scripts.eslint=\"eslint index.mjs modules/**\""'
```
