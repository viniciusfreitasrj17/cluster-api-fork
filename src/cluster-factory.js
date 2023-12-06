import cluster from 'cluster'
import { forkCount as forkCountDefault } from './config'

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

const runWorkerProcess = async (bootstrapRelativePath) => {
  await import(String(bootstrapRelativePath))
}

/**
 * @param {string} bootstrapRelativePath bootstrap path to run clustering
 * @param {number} forkCount fork count to schedule, default: cpu.length * 2
 */
export default function clusterFactory(bootstrapRelativePath, forkCount) {
  cluster.isPrimary 
    ? runPrimaryProcess(forkCount || forkCountDefault) 
    : runWorkerProcess(process.cwd() + '/' + bootstrapRelativePath)
}
