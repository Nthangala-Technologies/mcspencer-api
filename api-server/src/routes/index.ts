import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import adminRouter from "./admin.js";
import ordersRouter from "./orders.js";
import contactRouter from "./contact.js";
import trackRouter from "./track.js";
import productsRouter from "./products.js";

const router: IRouter = Router();

router.get("/", (_req, res) => {
  res.json({
    service: "McSpencer Enterprise API",
    version: "1.0.0",
    status: "online",
    environment: process.env["NODE_ENV"] ?? "development",
    endpoints: [
      { method: "GET",   path: "/api/healthz",                  description: "Health check" },
      { method: "GET",   path: "/api/products",                 description: "List all products" },
      { method: "POST",  path: "/api/orders",                   description: "Place a new order" },
      { method: "GET",   path: "/api/orders/:orderNumber",      description: "Look up order by number" },
      { method: "POST",  path: "/api/contacts",                 description: "Submit a support message" },
      { method: "POST",  path: "/api/track",                    description: "Track a product view" },
      { method: "GET",   path: "/api/admin/stats",              description: "Dashboard KPIs (admin)" },
      { method: "GET",   path: "/api/admin/orders",             description: "List all orders (admin)" },
      { method: "PATCH", path: "/api/admin/orders/:id",         description: "Update order status (admin)" },
      { method: "DELETE",path: "/api/admin/orders/:id",         description: "Delete an order (admin)" },
      { method: "GET",   path: "/api/admin/inventory",          description: "List inventory (admin)" },
      { method: "PATCH", path: "/api/admin/inventory/:id",      description: "Update stock/featured/active (admin)" },
      { method: "GET",   path: "/api/admin/contacts",           description: "List support messages (admin)" },
      { method: "PATCH", path: "/api/admin/contacts/:id",       description: "Update message status (admin)" },
      { method: "DELETE",path: "/api/admin/contacts/:id",       description: "Delete a message (admin)" },
    ],
  });
});

router.use(healthRouter);
router.use("/admin", adminRouter);
router.use("/orders", ordersRouter);
router.use("/contacts", contactRouter);
router.use("/track", trackRouter);
router.use("/products", productsRouter);

export default router;
