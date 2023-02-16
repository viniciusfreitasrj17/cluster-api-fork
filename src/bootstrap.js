import gracefulShutdown from './graceful-shutdown';
import { server } from './server'

server
  .listen(3000)
  .once('listening', () => console.log('Server running at 3000... ', process.pid));

gracefulShutdown(server)