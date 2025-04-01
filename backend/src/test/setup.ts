import { beforeAll } from "vitest";
import { Server } from "http";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import { initDBConnection } from "@/config/database";
import bootstrap from "@/app";

const app = bootstrap({ testMode: true });
let server: Server;
let request: TestAgent;

beforeAll(async () => {
  await initDBConnection();
  server = app.listen(0);
  request = supertest(app);
});

export { request };
