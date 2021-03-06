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
    expect(res.body).toHaveProperty("name", "Honda");
    expect(res.body).toHaveProperty("country", "Japan");
  });

  it("should return error 422 when name is empty", async () => {
    const res = await request(app)
      .post("/automakers")
      .send({
        country: "United States"
      });
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("errors");
  });

  it("should update an existing automaker", async () => {
    const res = await request(app)
      .put("/automakers/2")
      .send({
        name: "Puma",
        country: "Brazil"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Puma");
    expect(res.body).toHaveProperty("country", "Brazil");
  });

  it("should return all automakers", async () => {
    const res = await request(app).get("/automakers");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return one automaker", async () => {
    const res = await request(app).get("/automakers/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Toyota");
    expect(res.body).toHaveProperty("country", "Japan");
  });

  it("should delete one automaker", async () => {
    const res = await request(app).delete("/automakers/3");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(1);
  });
});
