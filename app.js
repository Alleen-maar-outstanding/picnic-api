const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// --- Roles ---
app.get("/api/roles", async (req, res) => {
  const roles = await prisma.role.findMany();
  res.json(roles);
});

app.post("/api/roles", async (req, res) => {
  const role = await prisma.role.create({ data: req.body });
  res.status(201).json(role);
});

// --- Clients ---
app.get("/api/clients", async (req, res) => {
  const clients = await prisma.client.findMany();
  res.json(clients);
});

app.post("/api/clients", async (req, res) => {
  const client = await prisma.client.create({ data: req.body });
  res.status(201).json(client);
});

// --- Employees ---
app.get("/api/employees", async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
});

app.post("/api/employees", async (req, res) => {
  const employee = await prisma.employee.create({ data: req.body });
  res.status(201).json(employee);
});

// --- Products ---
app.get("/api/products", async (req, res) => {
  const products = await prisma.product.findMany({
    include: { stock: true },
  });
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const product = await prisma.product.create({ data: req.body });
  res.status(201).json(product);
});

// --- Stock ---
app.get("/api/products/:id/stock", async (req, res) => {
  const stock = await prisma.stock.findUnique({
    where: { product_id: parseInt(req.params.id) },
  });
  res.json(stock);
});

app.put("/api/products/:id/stock", async (req, res) => {
  const stock = await prisma.stock.update({
    where: { product_id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(stock);
});

// --- Orders ---
app.get("/api/orders", async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      client: true,
      employee: true,
      order_product: { include: { product: true } },
    },
  });
  res.json(orders);
});

app.post("/api/orders", async (req, res) => {
  const order = await prisma.order.create({ data: req.body });
  res.status(201).json(order);
});

// --- Order-Product ---
app.post("/api/orders/:id/products", async (req, res) => {
  const { id } = req.params;
  const { products_id, quantity } = req.body;
  const orderProduct = await prisma.order_product.create({
    data: { orders_id: parseInt(id), products_id, quantity },
  });
  res.status(201).json(orderProduct);
});

app.delete("/api/orders/:orderId/products/:productId", async (req, res) => {
  const { orderId, productId } = req.params;
  await prisma.order_product.delete({
    where: {
      products_id_orders_id: {
        orders_id: parseInt(orderId),
        products_id: parseInt(productId),
      },
    },
  });
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
