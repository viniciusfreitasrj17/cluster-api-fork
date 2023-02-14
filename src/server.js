import { createServer } from 'http'
import { routes, notFound } from './routes.js'

export const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  
  const { 
    status,
    headers,
    message,
    error,
  } = routes[url.pathname] 
    ? await routes[url.pathname](req.method) 
    : notFound(req.method)
  
  res.writeHead(status, headers)
  return res.end(message || error)
})
