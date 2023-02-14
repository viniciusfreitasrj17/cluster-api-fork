import { server } from './server.js'
export const processId = process.pid;

server
  .listen(3000, () => console.log('Server running at 3000... ', processId))
