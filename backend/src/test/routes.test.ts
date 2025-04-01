import { describe, expect, it } from "vitest";
import { request } from "./setup";
import { fakeUserAuth } from "@/utils/faker";

describe("Stockdash API v1", () => {
  const urlPrefix = "/api/v1";
  describe("User authentication", () => {
    it("should return the access token from: [POST] - /sign-in", async () => {
      const user = await fakeUserAuth();
      const authResponse = await request
        .post(`${urlPrefix}/sign-in`)
        .send(user.credentials)
        .set("Accept", "application/json");
      expect(authResponse.statusCode).toBe(200);
      expect(authResponse.body).toHaveProperty("token");
      await user.destroyFakeCredentials();
    });
    it("should return the 401 status code when the email doesn't exist: [POST] - /sign-in", async () => {
      const user = await fakeUserAuth();
      const response = await request
        .post(`${urlPrefix}/sign-in`)
        .send({
          email: "unknown_email@gmail.com",
          password: "random_password",
        })
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(401);
    });
    it("should return the 401 status code when the password is invalid: [POST] - /sign-in", async () => {
      const user = await fakeUserAuth();
      const response = await request
        .post(`${urlPrefix}/sign-in`)
        .send({
          email: user.credentials.email,
          password: "random_password",
        })
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(401);
    });
    it("should return a json object response with a consistent format error when the email and password doesn't exist: [POST] - /sign-in", async () => {
      const user = await fakeUserAuth();
      const withInvalidEmailResponse = await request
        .post(`${urlPrefix}/sign-in`)
        .send({
          email: "unknown_random@gmail.com",
          password: user.credentials.password,
        });
      // Invalid email
      expect(withInvalidEmailResponse.body).toHaveProperty("error");
      expect(withInvalidEmailResponse.body).toHaveProperty("error.status");
      expect(withInvalidEmailResponse.body).toHaveProperty("error.message");
      expect(withInvalidEmailResponse.body).toHaveProperty("error.errors");
      expect(withInvalidEmailResponse.body).toHaveProperty("error.type");
      // Invalid password
      const withInvalidPassResponse = await request
        .post(`${urlPrefix}/sign-in`)
        .send({
          email: user.credentials.email,
          password: "unknown_fake_password",
        });
      expect(withInvalidPassResponse.body).toHaveProperty("error");
      expect(withInvalidPassResponse.body).toHaveProperty("error.status");
      expect(withInvalidPassResponse.body).toHaveProperty("error.message");
      expect(withInvalidPassResponse.body).toHaveProperty("error.errors");
      expect(withInvalidPassResponse.body).toHaveProperty("error.type");
      await user.destroyFakeCredentials();
    });
    it("should return 'INVALID_EMAIL' property type on json response when the user introduce a wrong email: [POST] - /sign-in", async () => {
      const user = await fakeUserAuth();
      const response = await request
        .post(`${urlPrefix}/sign-in`)
        .send({
          email: "unknown_fake@gmail.com",
          password: user.credentials.password,
        })
        .set("Accept", "application/json");
      expect(response.body).toHaveProperty("error.type", "INVALID_EMAIL");
      user.destroyFakeCredentials();
    });
    it("should return 'INVALID_PASSWORD' property type on json response when the user introduce a wrong password: [POST] - /sign-in", async () => {
      const user = await fakeUserAuth();
      const response = await request
        .post(`${urlPrefix}/sign-in`)
        .send({
          email: user.credentials.email,
          password: "invalid_password",
        })
        .set("Accept", "application/json");
      expect(response.body).toHaveProperty("error.type", "INVALID_PASSWORD");
      user.destroyFakeCredentials();
    });
    it("should return the same status code response on json error property: [POST] - /sign-in", async () => {
      const user = await fakeUserAuth();
      const response = await request
        .post(`${urlPrefix}/sign-in`)
        .send({
          email: user.credentials.email,
          password: "invalid_password",
        })
        .set("Accept", "application/json");
      expect(response.body).toHaveProperty("error.status", response.statusCode);
      user.destroyFakeCredentials();
    });
  });
  describe("Account controller", () => {
    it("should return the user account information excluding sensitive information: /account/profile", async () => {
      const user = await fakeUserAuth();
      await request.post(`${urlPrefix}/sign-in`).send(user.credentials);
      const response = request.get(`${urlPrefix}/profile/account`);
      console.log(response);
    });
  });
});
