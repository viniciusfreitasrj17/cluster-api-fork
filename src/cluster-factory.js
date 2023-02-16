import os from 'os'
import cluster from 'cluster'

const runPrimaryProcess = (forkCount) => {
  const processesCount = Number(forkCount)
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

const runWorkerProcess = async (bootstrapPath) => {
  await import(String(bootstrapPath))
}

/**
 * @param {string} bootstrapPath bootstrap path to run clustering
 * @param {number} forkCount fork count to schedule, default: cpu.length * 2
 */
export default function clusterFactory(bootstrapPath, forkCount) {
  cluster.isPrimary ? runPrimaryProcess(forkCount || os.cpus().length * 2) : runWorkerProcess(bootstrapPath)
}
