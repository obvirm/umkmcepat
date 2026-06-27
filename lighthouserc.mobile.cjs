module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3005/",
        "http://localhost:3005/terms",
        "http://localhost:3005/privacy",
      ],
      numberOfRuns: 3,
      startServerCommand: "bun run build && bun run start -- -p 3005",
      startServerReadyPattern: "Ready in|started server|Local:",
      startServerReadyTimeout: 120000,
      settings: {
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
        chromeFlags: "--headless=new --no-sandbox --disable-dev-shm-usage",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci/mobile",
    },
  },
};
