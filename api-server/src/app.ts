import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { initDb } from "./lib/pgdb.js";

const app: Express = express();

const allowedOrigins = process.env["ALLOWED_ORIGINS"]
  ? process.env["ALLOWED_ORIGINS"].split(",").map((s) => s.trim())
  : ["http://localhost:3000", "http://localhost:5000"];

const isDev = process.env["NODE_ENV"] !== "production";

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      if (
        origin === "https://mcspencerenterprise.co.za" ||
        origin.endsWith(".mcspencerenterprise.co.za")
      ) return cb(null, true);
      if (isDev && /^https?:\/\/localhost(:\d+)?$/.test(origin)) return cb(null, true);
      if (isDev && (origin.endsWith(".replit.dev") || origin.endsWith(".repl.co"))) return cb(null, true);
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url?.split("?")[0] };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

initDb().catch((err) => console.error("[app] initDb failed:", err));

if (process.env["NODE_ENV"] !== "production") {
  import("http-proxy-middleware").then(({ createProxyMiddleware }) => {
    const vitePort = process.env["VITE_PORT"] ?? "3000";
    app.use(
      "/",
      createProxyMiddleware({
        target: `http://localhost:${vitePort}`,
        changeOrigin: true,
        ws: true,
      }),
    );
  });
}

export default app;
