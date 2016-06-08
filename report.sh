#!/bin/bash

NODE_BIN=/usr/sbin/node
CUR=$(dirname $0)
$NODE_BIN $CUR/src/run.js| zabbix_sender -c /etc/zabbix/zabbix_agentd.conf -i -

