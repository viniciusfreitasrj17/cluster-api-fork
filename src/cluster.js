import os from 'os'
import clusterFactory from "./cluster-factory";

export const forkCount = os.cpus().length * 2 // cpu.length * available memory.length

clusterFactory('./bootstrap', forkCount)