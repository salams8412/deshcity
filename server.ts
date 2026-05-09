import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "deshcity-secret-key-123";

// Database Initialization
const db = new Database("deshcity.db");
db.pragma("journal_mode = WAL");

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name_en TEXT,
    name_bn TEXT,
    slug TEXT UNIQUE,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name_en TEXT,
    name_bn TEXT,
    description_en TEXT,
    description_bn TEXT,
    price REAL,
    sale_price REAL,
    category_id TEXT,
    stock_status TEXT,
    image_url TEXT,
    gallery TEXT,
    variants TEXT,
    is_featured INTEGER DEFAULT 0,
    is_best_seller INTEGER DEFAULT 0,
    is_flash_sale INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    full_name TEXT,
    mobile_number TEXT,
    full_address TEXT,
    area_city TEXT,
    order_note TEXT,
    items TEXT,
    total_amount REAL,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS banners (
    id TEXT PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    link TEXT
  );
`);

// Seed Admin User
const seedAdmin = () => {
  const adminEmail = "salams8412@gmail.com";
  const adminPassword = "Sa819929"; 
  const existing = db.prepare("SELECT * FROM users WHERE email = ?").get(adminEmail);
  if (!existing) {
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    db.prepare("INSERT INTO users (id, email, password) VALUES (?, ?, ?)").run(
      crypto.randomUUID(),
      adminEmail,
      hashedPassword
    );
    console.log("Admin user seeded.");
  }
};
seedAdmin();

app.use(express.json());

// API Routes
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// Middleware to check admin auth
const authenticateAdmin = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = (decoded as any).userId;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Category Routes
app.get("/api/categories", (req, res) => {
  const categories = db.prepare("SELECT * FROM categories").all();
  res.json(categories);
});

app.post("/api/categories", authenticateAdmin, (req, res) => {
  const { name_en, name_bn, slug, image } = req.body;
  const id = crypto.randomUUID();
  db.prepare("INSERT INTO categories (id, name_en, name_bn, slug, image) VALUES (?, ?, ?, ?, ?)").run(
    id, name_en, name_bn, slug, image
  );
  res.json({ id });
});

// Product Routes
app.get("/api/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products.map((p: any) => ({
    ...p,
    gallery: JSON.parse(p.gallery || "[]"),
    variants: JSON.parse(p.variants || "[]")
  })));
});

app.post("/api/products", authenticateAdmin, (req, res) => {
  const { name_en, name_bn, description_en, description_bn, price, sale_price, category_id, stock_status, image_url, gallery, variants, is_featured, is_best_seller, is_flash_sale } = req.body;
  const id = crypto.randomUUID();
  db.prepare(`
    INSERT INTO products (
      id, name_en, name_bn, description_en, description_bn, price, sale_price, 
      category_id, stock_status, image_url, gallery, variants, is_featured, is_best_seller, is_flash_sale
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, name_en, name_bn, description_en, description_bn, price, sale_price, 
    category_id, stock_status, image_url, JSON.stringify(gallery), JSON.stringify(variants), 
    is_featured ? 1 : 0, is_best_seller ? 1 : 0, is_flash_sale ? 1 : 0
  );
  res.json({ id });
});

// Order Routes
app.post("/api/orders", (req, res) => {
  const { full_name, mobile_number, full_address, area_city, order_note, items, total_amount } = req.body;
  const id = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  db.prepare(`
    INSERT INTO orders (id, full_name, mobile_number, full_address, area_city, order_note, items, total_amount, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, full_name, mobile_number, full_address, area_city, order_note, JSON.stringify(items), total_amount, "pending");
  res.json({ id, status: "pending" });
});

app.get("/api/orders", authenticateAdmin, (req, res) => {
  const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
  res.json(orders.map((o: any) => ({
    ...o,
    items: JSON.parse(o.items || "[]")
  })));
});

app.patch("/api/orders/:id/status", authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
  res.json({ success: true });
});

// Banner Routes
app.get("/api/banners", (req, res) => {
  const banners = db.prepare("SELECT * FROM banners").all();
  res.json(banners);
});

// Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
