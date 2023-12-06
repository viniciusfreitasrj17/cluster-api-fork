import { createServer } from 'http'
import { routes, notFound } from './routes'

export const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)

  const data = routes[url.pathname]
    ? routes[url.pathname](req.method)
    : notFound(req.method)
  
  let status = 500
  let headers = {"Content-Type": "application/json"}
  let message
  let error = JSON.stringify({error:'internal error'})

  if (data instanceof Promise) {   
    (async () => {
      const resp = await data.then(d => d)
      if (resp) {
        status = resp.status
        headers = resp.headers
        message = resp.message
        error = resp.error
      }
  
      res.writeHead(status, headers)
      return res.end(message || error)
    })()
  } else {
    const resp = data
    if (resp) {
      status = resp.status
      headers = resp.headers
      message = resp.message
      error = resp.error
    }

    res.writeHead(status, headers)
    return res.end(message || error)
  }
  
})
