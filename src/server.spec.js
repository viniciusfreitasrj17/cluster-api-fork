import request from "supertest";

const headers = "application/json"
const baseUrl = "localhost:3000"
const agent = request(baseUrl)

describe('Server Tests', () => {
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
  
  // 🔴 generate erro in api, it will kill api, test alone
  it('should generate a error kill no treated in route /throw-error-kill', async () => {
    try {
      await agent.get('/throw-error-kill')
    } catch (error) {
      expect(error.message).toBe('socket hang up') // kill api
    }
	});
})