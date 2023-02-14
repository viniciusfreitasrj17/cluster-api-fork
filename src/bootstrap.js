import { server } from './server.js'

server
  .listen(3000)
  .once('listening', () => console.log('Server running at 3000... ', process.pid));