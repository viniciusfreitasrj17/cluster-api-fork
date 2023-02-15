import { server } from './server.js'

server
  .listen(3000)
  .once('listening', () => console.log('Server running at 3000... ', process.pid));

// --- graceful shutdown - no error
function gracefulShutdown(event) {
  return (code) => {
    console.log(`${event} received! ${new Date().toISOString()} with ${code}`)
    server.close(() => {
      console.log('http server closed')

      // ... closing db
      console.log('DB connection closed')
      process.exit(code)
    })
  }
}

// Ctrl + C
process.on('SIGINT', gracefulShutdown('SIGINT'))

// kill
process.on('SIGTERM', gracefulShutdown('SIGTERM'))

// exit
process.on('exit', (code) => {
  console.log('exit signal received ', code)
})