const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // --- Roles ---
  const adminRole = await prisma.roles.create({
    data: { name: "Admin", created_at: new Date(), updated_at: new Date() },
  });

  const customerRole = await prisma.roles.create({
    data: { name: "Customer", created_at: new Date(), updated_at: new Date() },
  });

  // --- Users ---
  const user1 = await prisma.users.create({
    data: {
      firstname: "John",
      lastname: "Doe",
      password: "password123",
      adress: "123 Main St",
      created_at: new Date(),
      updated_at: new Date(),
      role_id: customerRole.id,
    },
  });

  const user2 = await prisma.users.create({
    data: {
      firstname: "Jane",
      lastname: "Smith",
      password: "password456",
      adress: "456 Oak St",
      created_at: new Date(),
      updated_at: new Date(),
      role_id: adminRole.id,
    },
  });

  // --- Employees ---
  const employee1 = await prisma.employees.create({
    data: {
      firstname: "Alice",
      lastname: "Johnson",
      password: "employee123",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  const employee2 = await prisma.employees.create({
    data: {
      firstname: "Bob",
      lastname: "Brown",
      password: "employee456",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // --- Products (Food Items) ---
  const product1 = await prisma.products.create({
    data: {
      name: "Cheeseburger",
      price: 8.99,
      stock: 100,
      treshold: 10,
      storage_location: "Row 1 column 2",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  const product2 = await prisma.products.create({
    data: {
      name: "Pepperoni Pizza",
      price: 12.99,
      stock: 50,
      treshold: 5,
      storage_location: "Row 3 column 1",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  const product3 = await prisma.products.create({
    data: {
      name: "Caesar Salad",
      price: 7.99,
      stock: 30,
      treshold: 3,
      storage_location: "Row 5 column 1",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  const product4 = await prisma.products.create({
    data: {
      name: "Chicken Wings (10 pcs)",
      price: 9.99,
      stock: 40,
      treshold: 4,
      storage_location: "Row 2 column 4",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  const product5 = await prisma.products.create({
    data: {
      name: "French Fries",
      price: 3.49,
      stock: 200,
      treshold: 20,
      storage_location: "Row 1 column 1",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // --- Orders ---
  const order1 = await prisma.orders.create({
    data: {
      employee_id: employee1.id,
      user_id: user1.id,
      delivery_date: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  const order2 = await prisma.orders.create({
    data: {
      employee_id: employee2.id,
      user_id: user2.id,
      delivery_date: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // --- Orders-Products ---
  await prisma.orders_products.create({
    data: {
      orders_id: order1.id,
      products_id: product1.id, // Cheeseburger
      quantity: 2,
    },
  });

  await prisma.orders_products.create({
    data: {
      orders_id: order1.id,
      products_id: product5.id, // French Fries
      quantity: 1,
    },
  });

  await prisma.orders_products.create({
    data: {
      orders_id: order2.id,
      products_id: product2.id, // Pepperoni Pizza
      quantity: 1,
    },
  });

  await prisma.orders_products.create({
    data: {
      orders_id: order2.id,
      products_id: product4.id, // Chicken Wings
      quantity: 2,
    },
  });

  console.log("Database seeded with food delivery data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
