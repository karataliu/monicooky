To get start:

```
npm install -g gulp-cli typings
npm install
typings install
gulp
```

## Configure:

- Install monitoring server/agent

 refer to https://github.com/karataliu/monicake

- Import template

 [azure_subscription_status.xml](azure_subscription_status.xml)

- Setup config

 [monicooky_agentd.conf](monicooky_agentd.conf)



## Flow

- mcClient

 Fetch actual data.

- mcLib

 Convert actual data to json object.


- mcUtil

 Generate plan data from json object.

- run.ts

 Generate plan data

- report.sh

 send plain data to monitoring server