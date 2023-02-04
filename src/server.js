import { createServer } from 'http'

const headers = {"Content-Type": "application/json"}

function success(method) {
  if (method === "GET") {
    return {
      status: 200,
      headers,
      message: JSON.stringify({ Message: "Success"}),
      error: null
    }
  }
}

function notFound(method) {
  if (method === "GET") {
    return {
      status: 404,
      headers,
      message: JSON.stringify({ Message: "Not Found"}),
      error: null
    }
  }
}

function throwErrorTreated(...args) {
  try {
    throw new Error('Some error')
  } catch (error) {
    return {
      status: 500,
      headers,
      message: null,
      error: JSON.stringify({ error: error.message })
    }
  }
}

async function throwErrorPromise(...args) {
  await Promise.reject('No treated on promise')

  return {
    status: 200,
    headers,
    message: JSON.stringify({ Message: 'No treated on promise'}),
    error: null
  }
}

function throwError(...args) {
  throw new Error('Some error no treated')
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)

  const routes = {
    '/success': success,
    '/throw-error': throwError,
    '/throw-error-treated': throwErrorTreated,
    '/throw-error-promise': throwErrorPromise,
  }
  
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

server
  .listen(3000, () => console.log('Server running at 3000...'))
