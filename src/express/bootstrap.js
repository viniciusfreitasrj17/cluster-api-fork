import gracefulShutdown from '../graceful-shutdown';
import { app } from './app'

const server = app
  .listen(3000)
  .once('listening', () => console.log('Server running at 3000... ', process.pid));

gracefulShutdown(server)