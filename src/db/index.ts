import { drizzle } from "drizzle-orm/libsql";
import { config } from "../config.js";
import * as schema from "./schema.js";
import { ProxyAgent, RequestInit } from "undici";

const proxyAgent = new ProxyAgent({
  uri: "http://contractorproxyeast.northgrum.com:80",
});
let conn = undefined;

if (config.db.url && config.db.authToken) {
  conn = drizzle({
    connection: {
      url: config.db.url,
      authToken: config.db.authToken,
      fetch: (url: URL, options: any) => {
        return fetch(url, {
          ...options,
          dispatcher: proxyAgent,
        });
      }
    },
    schema: schema,
  });
  console.log("Connected to database!");
} else {
  console.log("DATABASE_URL environment variable is not set");
  console.log("TURSO_AUTH_TOKEN environment variable is not set");
  console.log("Running without CRUD endpoints");
}

export const db = conn;

export function assertDbConnection() {
  if (!db) {
    throw new Error("Database connection is not available");
  }
}
