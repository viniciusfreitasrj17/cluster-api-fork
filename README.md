# Cluster API

- A Simple API running with Cluster in Node.js

## Run

- Run app:
  
```sh
npm run dev
```

- Run tests:

```sh
npm test
```

## Pending

- [x] route return 200 (/success)
- [x] route with error no treated (/throw-error)
- [x] route with error treated (/throw-error-treated)
- [x] route with error promise no treated (/throw-error-promise)
- [x] route with error promise treated (/throw-error-promise-treated)
- [x] add tests
- [x] organize routes
- [x] route throw kill process (/throw-error-kill)
- [ ] create cluster
- [ ] graceful shutdown
- [ ] capture errors no treated
- [ ] implement load test
- [ ] implement middleware, like express
