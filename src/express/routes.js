import express from 'express'
const router = express.Router()

export function notFound(req, res, next) {
  next(res.status(404).send({ message: "Not Found"}))
}

export function errorHandler (req, res, next) {
  // if (res.headersSent) {
  //   return next(err)
  // }
  console.log('🔴 ===> res', res);
  if (res.status === 200) {
    next()
  }
  res.status(500).send({ error: res })
}

router.get('/success', (req, res, next) => {
  next(res.send({ message: `ok ::: pid: ${process.pid}`}))
})

router.get('/throw-error', (req, res, next) => {
  throw new Error('No treated some error')
})

router.get('/throw-error-treated', (req, res, next) => {
  try {
    throw new Error('Treated some error')
  } catch (error) {
    next(res.status(500).send({ error: error.message }))
  }
})

router.get('/throw-error-promise', (req, res, next) => {
  next(Promise.reject('No treated on promise'))
})

router.get('/throw-error-promise-treated', async (req, res, next) => {
  try {
    await Promise.reject('Treated on promise')
  } catch (error) {
    next(res.status(500).send({ error }))
  }
})

router.get('/throw-error-kill', (req, res, next) => {
  process.kill(process.pid)
})

export default router
