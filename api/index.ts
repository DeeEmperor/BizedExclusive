// Vercel Serverless Function entry point.
// This re-uses the same Express app used for local development.
import app from "../server/app";

console.log("[BizedExclusive API] Function loaded at", new Date().toISOString());

export default app;
