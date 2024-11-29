const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Roles
  const adminRole = await prisma.role.create({ data: { name: "Admin" } });
  const employeeRole = await prisma.role.create({ data: { name: "Employee" } });

  // Employees
  const employee1 = await prisma.employee.create({
    data: {
      firstname: "Alice",
      lastname: "Johnson",
      password: "password123",
      role_id: adminRole.id,
    },
  });

  // Clients
  const client1 = await prisma.client.create({
    data: {
      firstname: "John",
      lastname: "Doe",
      password: "clientpassword",
      adress: "123 Main St",
    },
  });

  // Products and Stock
  const product1 = await prisma.product.create({
    data: {
      name: "Pizza",
      price: 10.99,
    },
  });

  await prisma.stock.create({
    data: { product_id: product1.id, stock: 50, treshold: 5 },
  });

  // Orders
  const order1 = await prisma.order.create({
    data: {
      employee_id: employee1.id,
      user_id: client1.id,
      delivery_date: new Date(new Date().setDate(new Date().getDate() + 2)),
    },
  });

  // Order-Product
  await prisma.order_product.create({
    data: { orders_id: order1.id, products_id: product1.id, quantity: 2 },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
