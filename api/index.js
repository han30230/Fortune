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

module.exports = async function handler(req, res) {
  const app = await getApp();
  return app(req, res);
};
