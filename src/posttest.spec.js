import { spawn } from 'child_process';

import { forkCount } from "./cluster";

describe('Server Post Tests', () => {
  jest.setTimeout(500)
  it(`should has ${forkCount} length forks running in finish test`, (done) => {
    const child4 = spawn('wc',   ['-l']);
    const child3 = spawn('grep', ['-v', 'grep']);
    const child2 = spawn('grep', ['/src/cluster.js']);
    const child1 = spawn('ps',   ['aux']);

    child1.stdout.pipe(child2.stdin);
    child2.stdout.pipe(child3.stdin)
    child3.stdout.pipe(child4.stdin)

    child4.stdout.on('data', function(data) { 
      const count = parseInt(data.toString())
      expect(count).toBe(forkCount)
      done()
    });
	});
})