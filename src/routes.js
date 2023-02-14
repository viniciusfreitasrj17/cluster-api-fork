import { processId } from "./bootstrap.js"

export const routes = {
  '/success': success,
  '/throw-error': throwError,
  '/throw-error-treated': throwErrorTreated,
  '/throw-error-promise': throwErrorPromise,
  '/throw-error-promise-treated': throwErrorPromiseTreated,
  '/throw-error-kill': throwErrorKill,
}

const headers = {"Content-Type": "application/json"}

export function notFound(method) {
  if (method === "GET") {
    return {
      status: 404,
      headers,
      message: JSON.stringify({ message: "Not Found"}),
      error: null
    }
  }
}

function success(method) {
  if (method === "GET") {
    return {
      status: 200,
      headers,
      message: JSON.stringify({ message: "Success"}),
      error: null
    }
  }
}

function throwError(...args) {
  throw new Error('No treated some error')
}

function throwErrorTreated(...args) {
  try {
    throw new Error('Treated some error')
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
}

async function throwErrorPromiseTreated(...args) {
  try {
    await Promise.reject('Treated on promise')
  } catch (error) {
    return {
      status: 500,
      headers,
      message: null,
      error: JSON.stringify({ error })
    }
  }
}

function throwErrorKill(...args) {
  process.kill(processId)
}