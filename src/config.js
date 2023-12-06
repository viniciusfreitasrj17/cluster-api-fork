import os from 'os'

export const forkCount = os.cpus().length * 2 // cpu.length * available memory.length
