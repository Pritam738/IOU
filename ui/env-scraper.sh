#!/bin/bash

sed -i "s/\$DOCKERIZE/$DOCKERIZE/g" ./src/env.js

npm start