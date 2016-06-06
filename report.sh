#!/bin/bash

node src/run.js| zabbix_sender -c /etc/zabbix/zabbix_agentd.conf -i -


