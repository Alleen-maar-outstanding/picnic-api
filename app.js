const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// --- Roles ---
app.get("/roles", async (req, res) => {
  const roles = await prisma.roles.findMany();
  res.json(roles);
});

app.post("/roles", async (req, res) => {
  const role = await prisma.roles.create({ data: req.body });
  res.status(201).json(role);
});

app.get("/roles/:id", async (req, res) => {
  const role = await prisma.roles.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(role);
});

app.put("/roles/:id", async (req, res) => {
  const role = await prisma.roles.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(role);
});

app.delete("/roles/:id", async (req, res) => {
  await prisma.roles.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
});

// --- Users ---
app.get("/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = await prisma.users.create({ data: req.body });
  res.status(201).json(user);
});

app.get("/users/:id", async (req, res) => {
  const user = await prisma.users.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const user = await prisma.users.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  await prisma.users.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
});

// --- Employees ---
app.get("/employees", async (req, res) => {
  const employees = await prisma.employees.findMany();
  res.json(employees);
});

app.post("/employees", async (req, res) => {
  const employee = await prisma.employees.create({ data: req.body });
  res.status(201).json(employee);
});

app.get("/employees/:id", async (req, res) => {
  const employee = await prisma.employees.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(employee);
});

app.put("/employees/:id", async (req, res) => {
  const employee = await prisma.employees.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(employee);
});

app.delete("/employees/:id", async (req, res) => {
  await prisma.employees.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
});

// --- Products ---
app.get("/products", async (req, res) => {
  const products = await prisma.products.findMany();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = await prisma.products.create({ data: req.body });
  res.status(201).json(product);
});

app.get("/products/:id", async (req, res) => {
  const product = await prisma.products.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(product);
});

app.put("/products/:id", async (req, res) => {
  const product = await prisma.products.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  await prisma.products.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
});

// --- Orders ---
app.get("/orders", async (req, res) => {
  const orders = await prisma.orders.findMany({
    include: {
      user: true,
      employee: true,
      orders_products: { include: { product: true } },
    },
  });
  res.json(orders);
});

app.post("/orders", async (req, res) => {
  const order = await prisma.orders.create({ data: req.body });
  res.status(201).json(order);
});

app.get("/orders/:id", async (req, res) => {
  const order = await prisma.orders.findUnique({
    where: { id: parseInt(req.params.id) },
    include: {
      user: true,
      employee: true,
      orders_products: { include: { product: true } },
    },
  });
  res.json(order);
});

app.put("/orders/:id", async (req, res) => {
  const order = await prisma.orders.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(order);
});

app.delete("/orders/:id", async (req, res) => {
  await prisma.orders.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
});

// --- Orders-Products ---
app.get("/orders/:id/products", async (req, res) => {
  const { id } = req.params;
  const orderProducts = await prisma.orders_products.findMany({
    where: { orders_id: parseInt(id) },
    include: { product: true },
  });
  res.json(orderProducts);
});

app.post("/orders/:id/products", async (req, res) => {
  const { id } = req.params;
  const { products_id, quantity } = req.body;
  const orderProduct = await prisma.orders_products.create({
    data: { orders_id: parseInt(id), products_id, quantity },
  });
  res.status(201).json(orderProduct);
});

app.put("/orders/:orderId/products/:productId", async (req, res) => {
  const { orderId, productId } = req.params;
  const { quantity } = req.body;
  const updatedOrderProduct = await prisma.orders_products.update({
    where: {
      orders_id_products_id: {
        orders_id: parseInt(orderId),
        products_id: parseInt(productId),
      },
    },
    data: { quantity },
  });
  res.json(updatedOrderProduct);
});

app.delete("/orders/:orderId/products/:productId", async (req, res) => {
  const { orderId, productId } = req.params;
  await prisma.orders_products.delete({
    where: {
      orders_id_products_id: {
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
