const request = require("supertest");
const server = require("../../api/server");
const db = require("../../database/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Users route", () => {
  it("[POST /api/register] - should return 400 because body was not provided", async () => {
    const expectedStatusCode = 400;

    const response = await request(server).post("/api/register");
    expect(response.status).toEqual(expectedStatusCode);
  });

  it("[POST /api/register] - should return 201 because request was successful", async () => {
    const expectedStatusCode = 201;

    const response = await request(server)
      .post("/api/register")
      .send({ username: "john", password: 123456 });
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.status).toEqual("success");
    expect(response.body.message).toEqual("User created successfully");
  });

  it("[POST /api/login] - should login a user", async () => {
    const expectedStatusCode = 201;
    let username = "john";
    let password = 123456;
    let response = await request(server)
      .post("/api/register")
      .send({ username, password });
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body.status).toEqual("success");
    expect(response.body.message).toEqual("User created successfully");

    response = await request(server)
      .post("/api/login")
      .send({ username, password });
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual("success");
    expect(response.body.message).toEqual(
      `Welcome ${username}, login successful`
    );
  });

  it("[POST /api/login/] - should return user not found", async () => {
    let username = "john";
    let password = 123456;
    const response = await request(server)
      .post("/api/login")
      .send({ username, password });
    expect(response.status).toEqual(404);
    expect(response.body.status).toEqual("error");
    expect(response.body.message).toEqual("User not found");
  });
});
