import { describe, expect, test } from "vitest";
import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.js";

describe("get ApiKey", () => {
  const validHttpHeader: IncomingHttpHeaders = {
    authorization: "ApiKey test-api-key",
  };
  test("valid auth httpHeader", () => {
    expect(getAPIKey(validHttpHeader)).toEqual("test-api-key");
  });

  test("missing authorization", () => {
    const missingAuthHeader: IncomingHttpHeaders = {
      "content-type": "html/txt",
    };
    expect(getAPIKey(missingAuthHeader)).toBeNull();
  });

  test("missing missing ApiKey value", () => {
    const missingApiKeyHeader: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(missingApiKeyHeader)).toBeNull();
  });

  test("missing missing ApiKey", () => {
    const missingApiKeyHeader: IncomingHttpHeaders = {
      authorization: "test-api-key",
    };
    expect(getAPIKey(missingApiKeyHeader)).toEqual("test-api-key");
  });
});
