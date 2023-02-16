import { Server } from 'http'

/**
 * @param {Server} server instance server http
 */
export default function gracefulShutdown(server) {
  // capture errors no treated on uncaught
  process.on('uncaughtException', (error, origin) => {
    console.log(`\n${origin} signal received. \n${error}`)
    process.exit(1) // kill process for cluster scheduling another one
  })

  // capture errors no treated on prommise
  process.on('unhandledRejection', (error) => {
    console.log(`\nunhandledRejection signal received. \n${error}`)
    process.exit(1) // kill process for cluster scheduling another one
  })

  // --- graceful shutdown - no error
  function gracefulShutdown(event) {
    return (code) => {
      console.log(`${event} received! ${new Date().toISOString()} with ${code}`)
      server.close(() => {
        console.log('http server closed')

        // ... closing db
        console.log('DB connection closed')
        process.exit(1) // kill process for cluster scheduling another one
      })
    }
  }

  // Ctrl + C
  process.on('SIGINT', gracefulShutdown('SIGINT'))

  // kill
  process.on('SIGTERM', gracefulShutdown('SIGTERM'))
}
