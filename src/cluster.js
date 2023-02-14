import os from 'os'
import cluster from 'cluster'

const runPrimaryProcess = () => {
  const processesCount = os.cpus().length * 2 // cpu.length * available memory.length
  console.log(`Primary ${process.pid} is running`)
  console.log(`Forking Server with ${processesCount} processes \n`)

  for (let i = 0; i < processesCount; i++)
    cluster.fork()

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died... scheduling another one!`)
      cluster.fork()
    }
  })
}

const runWorkerProcess = async () => {
  await import('./bootstrap.js')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()
