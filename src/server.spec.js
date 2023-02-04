import request from "supertest";

const headers = "application/json"
const baseUrl = "localhost:3000"
const agent = request(baseUrl)

describe('Server Tests', () => {
	it('should return a 200 status code in route /success', async () => {
		const response = await agent.get('/success')

		expect(response.statusCode).toBe(200);
		expect(response.header["content-type"]).toBe(headers);
		expect(response.body).toStrictEqual({ message: "Success"});
	});

  it('should return a 404 status code in unknown route', async () => {
		const response = await agent.get('/any-path')

		expect(response.statusCode).toBe(404);
		expect(response.header["content-type"]).toBe(headers);
		expect(response.body).toStrictEqual({ message: "Not Found"});
	});

  // generate erro in api, teste alone
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

  // // generate erro in api, teste alone
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
})