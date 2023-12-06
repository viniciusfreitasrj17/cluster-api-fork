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

  let sockets = {}, nextSocketId = 0;
  server.on('connection', function (socket) {
    // Add a newly connected socket
    nextSocketId++
    let socketId = nextSocketId;
    sockets[socketId] = socket;
    console.log('socket', socketId, 'opened');

    // Remove the socket when it closes
    socket.on('close', function (err) {
      for (let socketId in sockets) {
        console.log('socket', socketId, 'destroyed');
        sockets[socketId].destroy();
      }
      console.log('socket', socketId, 'closed');
      delete sockets[socketId];
      process.exit(1)
    });

    // Extend socket lifetime for demo purposes
    socket.setTimeout(4000);
  });

  // --- graceful shutdown - no error
  function gracefulShutdown(event) {
    return async (code) => {
      

        console.log(`${event} received! ${new Date().toISOString()} with ${code}`)
  
        // server.close(function () { console.log('Server closed!'); });
        // Destroy all open sockets
        server.close(async (err) => {
          if (err) reject(err);
          console.log('http server closed')
  
          // long command
          await new Promise((resolve, reject) => {resolve(setTimeout(console.log('close long command'), 5000))})
          
          // ... closing db
          console.log('DB connection closed')
        })
        // for (let socketId in sockets) {
        //   console.log('socket', socketId, 'destroyed');
        //   sockets[socketId].destroy();
        // }
        // server.on('close', () => {
          // process.exit(1) // kill process for cluster scheduling another one
        // })
      // })
    }
  }

  // Ctrl + C
  process.on('SIGINT', gracefulShutdown('SIGINT'))

  // kill
  process.on('SIGTERM', gracefulShutdown('SIGTERM'))
}
