// Vercel serverless handler: run Express app for all routes
const { createApp } = require("../dist/index.cjs");

let appPromise;

async function getApp() {
  if (!appPromise) {
    const { app } = await createApp();
    appPromise = app;
  }
  return appPromise;
}

// Vercel rewrites send requests to /api; restore original path so Express routes match
function restoreOriginalPath(req) {
  const orig = req.headers["x-vercel-original-url"] || req.headers["x-original-url"];
  if (orig) {
    try {
      const pathname = orig.startsWith("http") ? new URL(orig).pathname : orig;
      if (pathname && pathname !== req.url) req.url = pathname;
    } catch (_) {}
  }
}

module.exports = async function handler(req, res) {
  restoreOriginalPath(req);
  const app = await getApp();
  return app(req, res);
};
