#!/bin/bash

NODE_BIN=/usr/sbin/node
CUR=$(dirname $0)

$NODE_BIN $CUR/src/run.js discovery
