import express from 'express'
import router, { errorHandler, notFound } from './routes'

export const app = express()

app.use(express.json())

app.use(router)
app.use('*', notFound)
app.use(errorHandler)
