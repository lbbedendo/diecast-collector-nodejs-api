const request = require("supertest");
const app = require("../../src/server");

describe("Automaker endpoints", () => {
  it("should create a new automaker", async () => {
    const res = await request(app)
      .post("/automakers")
      .send({
        name: "Honda",
        country: "Japan"
      });
    expect(res.statusCode).toEqual(201);
  });

  it("should return error 422 when body is invalid", async () => {
    const res = await request(app)
      .post("/automakers")
      .send({
        country: "United States"
      });
    expect(res.statusCode).toEqual(422);
  });

  it("should return all automakers", async () => {
    const res = await request(app).get("/automakers");
    expect(res.statusCode).toEqual(200);
  });

  it("should return one automaker", async () => {
    const res = await request(app).get("/automakers/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("country");
  });

  it("should delete one automaker", async () => {
    const res = await request(app).delete("/automakers/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(1);
  });
});
