# Cluster API

- A Simple API running with Cluster in Node.js

## Run

- Run dev:
  
```sh
npm run dev
```

- Run cluster:
  
```sh
npm run cluster
```

- Run tests (this tests should be run with cluster up):

```sh
npm test
```

- Run load test (this test should be run with cluster or server up):

```sh
npm run test:load
```

***

## Report load test in simple server

Running 2s warmup @ <http://localhost:3000/success>
1 connections
10 workers

Running 30s test @ <http://localhost:3000/success>
500 connections
10 workers

...

| Stat    | 2.5%  | 50%   | 97.5% | 99%   | Avg     | Stdev  | Max    |
| ------- | ----- | ----- | ----- | ----- | ------- | ------ | ------ |
| Latency | 29 ms | 34 ms | 54 ms | 70 ms | 35.5 ms | 8.6 ms | 269 ms |

| Stat      | 1%      | 2.5%    | 50%     | 97.5%   | Avg      | Stdev   | Min     |
| --------- | ------- | ------- | ------- | ------- | -------- | ------- | ------- |
| Req/Sec   | 9599    | 9599    | 14231   | 14951   | 13916.27 | 1077.03 | 9594    |
| Bytes/Sec | 1.98 MB | 1.98 MB | 2.93 MB | 3.08 MB | 2.87 MB  | 222 kB  | 1.98 MB |

| Code | Count  |
| ---- | ------ |
| 200  | 417490 |

Req/Bytes counts sampled once per second.

- of samples: 300

| Percentile | Latency (ms) |
| ---------- | ------------ |
| 0.001      | 4            |
| 0.01       | 8            |
| 0.1        | 13           |
| 1          | 28           |
| 2.5        | 29           |
| 10         | 31           |
| 25         | 32           |
| 50         | 34           |
| 75         | 36           |
| 90         | 40           |
| 97.5       | 54           |
| 99         | 70           |
| 99.9       | 138          |
| 99.99      | 217          |
| 99.999     | 266          |

418k requests in 30.21s, 86 MB read

***

## Report load test in cluster

Running 2s warmup @ <http://localhost:3000/success>
1 connections
10 workers

Running 30s test @ <http://localhost:3000/success>
500 connections
10 workers

...

| Stat    | 2.5% | 50%   | 97.5% | 99%   | Avg     | Stdev    | Max    |
| ------- | ---- | ----- | ----- | ----- | ------- | -------- | ------ |
| Latency | 3 ms | 23 ms | 72 ms | 89 ms | 26.1 ms | 19.48 ms | 424 ms |

| Stat      | 1%      | 2.5%    | 50%    | 97.5%   | Avg     | Stdev   | Min     |
| --------- | ------- | ------- | ------- | ------- | -------- | ------- | ------- |
| Req/Sec   | 8935    | 8935    | 19903  | 21935   | 18859.2 | 3200.16 | 8930    |
| Bytes/Sec | 1.84 MB | 1.84 MB | 4.1 MB | 4.52 MB | 3.89 MB | 659 kB  | 1.84 MB |

| Code | Count  |
| ---- | ------ |
| 200  | 565766 |

Req/Bytes counts sampled once per second.

- of samples: 300

| Percentile | Latency (ms) |
| ---------- | ------------ |
| 0.001      | 0            |
| 0.01       | 0            |
| 0.1        | 0            |
| 1          | 2            |
| 2.5        | 3            |
| 10         | 6            |
| 25         | 12           |
| 50         | 23           |
| 75         | 35           |
| 90         | 49           |
| 97.5       | 72           |
| 99         | 89           |
| 99.9       | 151          |
| 99.99      | 309          |
| 99.999     | 418          |

566k requests in 30.19s, 117 MB read

***

## Pending

- [x] route return 200 (/success)
- [x] route with error no treated (/throw-error)
- [x] route with error treated (/throw-error-treated)
- [x] route with error promise no treated (/throw-error-promise)
- [x] route with error promise treated (/throw-error-promise-treated)
- [x] add tests
- [x] organize routes
- [x] route throw kill process (/throw-error-kill)
- [x] create cluster
- [x] graceful shutdown
- [x] capture errors no treated
- [x] implement load test
- [ ] implement cluster with server express
