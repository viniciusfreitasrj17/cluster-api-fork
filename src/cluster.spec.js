import request from "supertest";
import { spawn } from 'child_process';

import { forkCount } from "./cluster";

const headers = "application/json"
const baseUrl = "localhost:3000"
const agent = request(baseUrl)

describe('Server Tests', () => {
  it(`should has ${forkCount} length forks running in start test`, (done) => {
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

	it('should return a 200 status code in route /success', async () => {
		const response = await agent.get('/success')

		expect(response.statusCode).toBe(200);
		expect(response.header["content-type"]).toBe(headers);
		expect.objectContaining({
      message: expect.stringContaining('ok ::: pid: '),
   })
	});

  it('should return a 404 status code in unknown route', async () => {
		const response = await agent.get('/any-path')

		expect(response.statusCode).toBe(404);
		expect(response.header["content-type"]).toBe(headers);
		expect(response.body).toStrictEqual({ message: "Not Found"});
	});

  // 🔴 generate erro in api, it will kill api, test alone
  it('should generate a error no treated in route /throw-error', async () => {
    try {
      await agent.get('/throw-error')
    } catch (error) {
      expect(error.message).toBe('socket hang up') // kill api
    }
	});

  it('should return a 500 status code in route /throw-error-treated', async () => {
		const response = await agent.get('/throw-error-treated')

		expect(response.statusCode).toBe(500);
		expect(response.header["content-type"]).toBe(headers);
		expect(response.body).toStrictEqual({ error: "Treated some error"});
	});

  // 🔴 generate erro in api, it will kill api, test alone
  it('should generate a error promise no treated in route /throw-error-promise', async () => {
    try {
      await agent.get('/throw-error-promise')
    } catch (error) {
      expect(error.message).toBe('socket hang up') // kill api
    }
	});

  it('should return a 500 status code in route /throw-error-promise-treated', async () => {
		const response = await agent.get('/throw-error-promise-treated')

		expect(response.statusCode).toBe(500);
		expect(response.header["content-type"]).toBe(headers);
		expect(response.body).toStrictEqual({ error: "Treated on promise"});
	});
  
  it('should generate a error kill no treated in route /throw-error-kill', async () => {
    try {
      await agent.get('/throw-error-kill')
    } catch (error) {
      expect(error.message).toBe({'error':'internal error'})
    }
	});
})