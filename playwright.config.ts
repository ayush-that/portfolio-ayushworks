import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: "http://127.0.0.1:4173", screenshot: "on" },
  webServer: {
    command: "python3 -m http.server 4173 --bind 127.0.0.1 --directory out",
    url: "http://127.0.0.1:4173",
  },
});
