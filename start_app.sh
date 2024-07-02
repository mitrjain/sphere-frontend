#!/bin/bash

source ~/.nvm/nvm.sh
fuser -k 3000/tcp
npm start