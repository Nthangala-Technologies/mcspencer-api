import { Router } from "express";
import { query } from "../lib/pgdb.js";
import { sendOrderConfirmation } from "../lib/mailer.js";

const router = Router();

function genOrderNumber(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `MCE-${y}${m}-${rand}`;
}

router.post("/", async (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone, address, city, postal_code, items, subtotal, delivery_fee, total } = req.body;
    if (!customer_name || !customer_email || !items) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const orderNumber = genOrderNumber();
    const [order] = await query(
      `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, address, city, postal_code, items, subtotal, delivery_fee, total, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'pending') RETURNING *`,
      [orderNumber, customer_name, customer_email, customer_phone ?? null, address ?? null, city ?? null, postal_code ?? null, JSON.stringify(items), subtotal ?? 0, delivery_fee ?? 0, total ?? 0]
    );

    sendOrderConfirmation({
      to: customer_email,
      customerName: customer_name,
      orderNumber,
      items: Array.isArray(items) ? items : [],
      subtotal: subtotal ?? 0,
      deliveryFee: delivery_fee ?? 0,
      total: total ?? 0,
      address: address ?? undefined,
      city: city ?? undefined,
      postalCode: postal_code ?? undefined,
    }).catch((err: Error) => console.error("[mailer] confirmation email failed:", err.message));

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.get("/:orderNumber", async (req, res) => {
  try {
    const [order] = await query(`SELECT * FROM orders WHERE order_number = $1`, [req.params.orderNumber]);
    if (!order) return res.status(404).json({ error: "Not found" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
