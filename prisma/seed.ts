import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.payroll.deleteMany();
  await prisma.load.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  const hashedPassword = await hash("password123", 12);

  const tenant = await prisma.tenant.create({
    data: {
      name: "Swift Haul Logistics",
      slug: "swift-haul-logistics",
      plan: "professional",
      billingCycle: "monthly",
      address: "1200 Transport Blvd, Dallas, TX 75201",
      phone: "(214) 555-0100",
      email: "info@swifthaul.com",
    },
  });

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@asuite.com",
      password: hashedPassword,
      role: "ADMIN",
      tenantId: tenant.id,
    },
  });

  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        firstName: "Rebecca",
        lastName: "Torres",
        email: "rebecca@swifthaul.com",
        phone: "(214) 555-0101",
        position: "HR Director",
        department: "Administration",
        hireDate: new Date("2023-01-15"),
        status: "active",
        payType: "salary",
        payRate: 85000,
        tenantId: tenant.id,
      },
    }),
    prisma.employee.create({
      data: {
        firstName: "Marcus",
        lastName: "Chen",
        email: "marcus@swifthaul.com",
        phone: "(214) 555-0102",
        position: "Fleet Manager",
        department: "Operations",
        hireDate: new Date("2023-03-01"),
        status: "active",
        payType: "salary",
        payRate: 78000,
        tenantId: tenant.id,
      },
    }),
    prisma.employee.create({
      data: {
        firstName: "Diana",
        lastName: "Patel",
        email: "diana@swifthaul.com",
        phone: "(214) 555-0103",
        position: "Chief Dispatcher",
        department: "Dispatch",
        hireDate: new Date("2023-02-10"),
        status: "active",
        payType: "salary",
        payRate: 72000,
        tenantId: tenant.id,
      },
    }),
    prisma.employee.create({
      data: {
        firstName: "Carlos",
        lastName: "Reyes",
        email: "carlos@swifthaul.com",
        phone: "(214) 555-0104",
        position: "Mechanic Lead",
        department: "Maintenance",
        hireDate: new Date("2023-06-20"),
        status: "active",
        payType: "hourly",
        payRate: 35,
        tenantId: tenant.id,
      },
    }),
    prisma.employee.create({
      data: {
        firstName: "Linda",
        lastName: "Foster",
        email: "linda@swifthaul.com",
        phone: "(214) 555-0105",
        position: "Accountant",
        department: "Finance",
        hireDate: new Date("2023-04-05"),
        status: "active",
        payType: "salary",
        payRate: 68000,
        tenantId: tenant.id,
      },
    }),
    prisma.employee.create({
      data: {
        firstName: "Derek",
        lastName: "Simmons",
        email: "derek@swifthaul.com",
        phone: "(214) 555-0106",
        position: "Safety Officer",
        department: "Operations",
        hireDate: new Date("2024-01-10"),
        status: "active",
        payType: "salary",
        payRate: 65000,
        tenantId: tenant.id,
      },
    }),
  ]);

  const drivers = await Promise.all([
    prisma.driver.create({
      data: {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike@swifthaul.com",
        phone: "(214) 555-0201",
        licenseNumber: "CDL-TX-84521",
        licenseClass: "Class A CDL",
        licenseExpiry: new Date("2027-06-15"),
        status: "available",
        rating: 4.8,
        totalTrips: 342,
        totalMiles: 187500,
        hireDate: new Date("2022-03-15"),
        tenantId: tenant.id,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "Sarah",
        lastName: "Williams",
        email: "sarah@swifthaul.com",
        phone: "(214) 555-0202",
        licenseNumber: "CDL-CA-72315",
        licenseClass: "Class A CDL",
        licenseExpiry: new Date("2026-11-20"),
        status: "available",
        rating: 4.9,
        totalTrips: 428,
        totalMiles: 231000,
        hireDate: new Date("2021-08-01"),
        tenantId: tenant.id,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "James",
        lastName: "Brown",
        email: "james@swifthaul.com",
        phone: "(214) 555-0203",
        licenseNumber: "CDL-TX-63298",
        licenseClass: "Class A CDL",
        licenseExpiry: new Date("2027-03-10"),
        status: "available",
        rating: 4.6,
        totalTrips: 215,
        totalMiles: 118000,
        hireDate: new Date("2023-01-20"),
        tenantId: tenant.id,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "David",
        lastName: "Lee",
        email: "david@swifthaul.com",
        phone: "(214) 555-0204",
        licenseNumber: "CDL-CO-41876",
        licenseClass: "Class A CDL",
        licenseExpiry: new Date("2026-09-05"),
        status: "on_leave",
        rating: 4.7,
        totalTrips: 298,
        totalMiles: 165200,
        hireDate: new Date("2022-06-10"),
        tenantId: tenant.id,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "Chris",
        lastName: "Wilson",
        email: "chris@swifthaul.com",
        phone: "(214) 555-0205",
        licenseNumber: "CDL-TN-55432",
        licenseClass: "Class A CDL",
        licenseExpiry: new Date("2027-01-25"),
        status: "available",
        rating: 4.5,
        totalTrips: 176,
        totalMiles: 96400,
        hireDate: new Date("2023-09-15"),
        tenantId: tenant.id,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "Tom",
        lastName: "Martinez",
        email: "tom@swifthaul.com",
        phone: "(214) 555-0206",
        licenseNumber: "CDL-WA-38745",
        licenseClass: "Class A CDL",
        licenseExpiry: new Date("2027-08-30"),
        status: "available",
        rating: 4.4,
        totalTrips: 89,
        totalMiles: 52100,
        hireDate: new Date("2024-04-01"),
        tenantId: tenant.id,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "Angela",
        lastName: "Davis",
        email: "angela@swifthaul.com",
        phone: "(214) 555-0207",
        licenseNumber: "CDL-IL-29654",
        licenseClass: "Class B CDL",
        licenseExpiry: new Date("2026-12-18"),
        status: "available",
        rating: 4.9,
        totalTrips: 510,
        totalMiles: 278000,
        hireDate: new Date("2020-11-05"),
        tenantId: tenant.id,
      },
    }),
    prisma.driver.create({
      data: {
        firstName: "Robert",
        lastName: "Taylor",
        email: "robert@swifthaul.com",
        phone: "(214) 555-0208",
        licenseNumber: "CDL-GA-47821",
        licenseClass: "Class A CDL",
        licenseExpiry: new Date("2027-05-12"),
        status: "available",
        rating: 4.3,
        totalTrips: 124,
        totalMiles: 68500,
        hireDate: new Date("2024-02-15"),
        tenantId: tenant.id,
      },
    }),
  ]);

  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        unitNumber: "TK-101",
        type: "Semi Truck",
        make: "Freightliner",
        model: "Cascadia",
        year: 2023,
        vin: "1FUJGLDR5CLBR1234",
        licensePlate: "TX-TRK-1234",
        status: "available",
        mileage: 45200,
        fuelType: "diesel",
        tenantId: tenant.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        unitNumber: "TK-102",
        type: "Semi Truck",
        make: "Kenworth",
        model: "T680",
        year: 2022,
        vin: "2NKHHM7X2NM123456",
        licensePlate: "TX-TRK-5678",
        status: "available",
        mileage: 78900,
        fuelType: "diesel",
        tenantId: tenant.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        unitNumber: "TK-103",
        type: "Semi Truck",
        make: "Peterbilt",
        model: "579",
        year: 2024,
        vin: "1XPWD40X1FD234567",
        licensePlate: "TX-TRK-9012",
        status: "available",
        mileage: 12300,
        fuelType: "diesel",
        tenantId: tenant.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        unitNumber: "TK-104",
        type: "Semi Truck",
        make: "Volvo",
        model: "VNL 860",
        year: 2023,
        vin: "4V4NC9EJ5PH345678",
        licensePlate: "TX-TRK-3456",
        status: "maintenance",
        mileage: 62100,
        fuelType: "diesel",
        tenantId: tenant.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        unitNumber: "TK-105",
        type: "Box Truck",
        make: "International",
        model: "MV607",
        year: 2023,
        vin: "3HSDJAPR5PN456789",
        licensePlate: "TX-TRK-7890",
        status: "available",
        mileage: 34500,
        fuelType: "diesel",
        tenantId: tenant.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        unitNumber: "TK-106",
        type: "Semi Truck",
        make: "Mack",
        model: "Anthem",
        year: 2022,
        vin: "1M1AN07Y0NM567890",
        licensePlate: "TX-TRK-2345",
        status: "available",
        mileage: 89200,
        fuelType: "diesel",
        tenantId: tenant.id,
      },
    }),
  ]);

  const loadData = [
    { origin: "Dallas, TX", dest: "Los Angeles, CA", rate: 4800, distance: 1435, status: "delivered", commodity: "Electronics", broker: "FreightLink Inc", pickupDate: new Date("2025-12-01"), deliveryDate: new Date("2025-12-04"), driverId: drivers[0].id, vehicleId: vehicles[0].id },
    { origin: "Chicago, IL", dest: "Miami, FL", rate: 3900, distance: 1381, status: "delivered", commodity: "Auto Parts", broker: "LoadBoard Pro", pickupDate: new Date("2025-12-05"), deliveryDate: new Date("2025-12-08"), driverId: drivers[1].id, vehicleId: vehicles[1].id },
    { origin: "Houston, TX", dest: "Atlanta, GA", rate: 2800, distance: 790, status: "delivered", commodity: "General Freight", broker: "ShipFast LLC", pickupDate: new Date("2025-12-10"), deliveryDate: new Date("2025-12-12"), driverId: drivers[2].id, vehicleId: vehicles[2].id },
    { origin: "Seattle, WA", dest: "Denver, CO", rate: 3200, distance: 1321, status: "delivered", commodity: "Produce", broker: "Fresh Routes", pickupDate: new Date("2025-12-15"), deliveryDate: new Date("2025-12-18"), driverId: drivers[4].id, vehicleId: vehicles[4].id },
    { origin: "New York, NY", dest: "Nashville, TN", rate: 2600, distance: 886, status: "delivered", commodity: "Furniture", broker: "MovePro Transport", pickupDate: new Date("2025-12-20"), deliveryDate: new Date("2025-12-22"), driverId: drivers[5].id, vehicleId: vehicles[5].id },
    { origin: "Phoenix, AZ", dest: "Portland, OR", rate: 3500, distance: 1420, status: "in_transit", commodity: "Building Materials", broker: "FreightLink Inc", pickupDate: new Date("2026-01-05"), driverId: drivers[0].id, vehicleId: vehicles[0].id },
    { origin: "San Antonio, TX", dest: "Kansas City, MO", rate: 2100, distance: 810, status: "in_transit", commodity: "Textiles", broker: "LoadBoard Pro", pickupDate: new Date("2026-01-08"), driverId: drivers[1].id, vehicleId: vehicles[1].id },
    { origin: "Minneapolis, MN", dest: "Detroit, MI", rate: 1800, distance: 688, status: "in_transit", commodity: "Machinery", broker: "ShipFast LLC", pickupDate: new Date("2026-01-10"), driverId: drivers[6].id, vehicleId: vehicles[2].id },
    { origin: "Dallas, TX", dest: "Chicago, IL", rate: 2900, distance: 920, status: "assigned", commodity: "Electronics", broker: "TechFreight Co", pickupDate: new Date("2026-01-15"), driverId: drivers[2].id, vehicleId: vehicles[4].id },
    { origin: "Memphis, TN", dest: "Charlotte, NC", rate: 1600, distance: 630, status: "pending", commodity: "Consumer Goods", broker: "FastLane Logistics", pickupDate: new Date("2026-01-18") },
    { origin: "Indianapolis, IN", dest: "Tampa, FL", rate: 2400, distance: 940, status: "pending", commodity: "Pharmaceuticals", broker: "MedShip Inc", pickupDate: new Date("2026-01-20") },
    { origin: "Columbus, OH", dest: "Boston, MA", rate: 2000, distance: 755, status: "pending", commodity: "Paper Products", broker: "LoadBoard Pro", pickupDate: new Date("2026-01-22") },
    { origin: "Salt Lake City, UT", dest: "San Francisco, CA", rate: 2200, distance: 735, status: "delivered", commodity: "Food Products", broker: "Fresh Routes", pickupDate: new Date("2026-01-02"), deliveryDate: new Date("2026-01-04"), driverId: drivers[4].id, vehicleId: vehicles[5].id },
    { origin: "Jacksonville, FL", dest: "Philadelphia, PA", rate: 2700, distance: 850, status: "delivered", commodity: "Chemicals", broker: "ChemTrans LLC", pickupDate: new Date("2026-01-03"), deliveryDate: new Date("2026-01-06"), driverId: drivers[7].id, vehicleId: vehicles[0].id },
    { origin: "Las Vegas, NV", dest: "Austin, TX", rate: 3100, distance: 1220, status: "delivered", commodity: "Retail Goods", broker: "ShipFast LLC", pickupDate: new Date("2026-02-01"), deliveryDate: new Date("2026-02-04"), driverId: drivers[5].id, vehicleId: vehicles[1].id },
  ];

  for (let i = 0; i < loadData.length; i++) {
    const ld = loadData[i];
    await prisma.load.create({
      data: {
        loadNumber: `LD-${String(i + 1).padStart(5, "0")}`,
        origin: ld.origin,
        destination: ld.dest,
        rate: ld.rate,
        distance: ld.distance,
        status: ld.status,
        commodity: ld.commodity,
        broker: ld.broker,
        pickupDate: ld.pickupDate,
        deliveryDate: ld.deliveryDate || null,
        driverId: ld.driverId || null,
        vehicleId: ld.vehicleId || null,
        tenantId: tenant.id,
      },
    });
  }

  const payrollRecords = [
    { name: "Mike Johnson", period: "Dec 2025", start: "2025-12-01", end: "2025-12-31", base: 5200, overtime: 450, bonus: 200, deduct: 180, tax: 850 },
    { name: "Sarah Williams", period: "Dec 2025", start: "2025-12-01", end: "2025-12-31", base: 5800, overtime: 300, bonus: 350, deduct: 200, tax: 940 },
    { name: "James Brown", period: "Dec 2025", start: "2025-12-01", end: "2025-12-31", base: 4800, overtime: 600, bonus: 0, deduct: 150, tax: 780 },
    { name: "Rebecca Torres", period: "Dec 2025", start: "2025-12-01", end: "2025-12-31", base: 7083, overtime: 0, bonus: 0, deduct: 350, tax: 1200 },
    { name: "Marcus Chen", period: "Dec 2025", start: "2025-12-01", end: "2025-12-31", base: 6500, overtime: 0, bonus: 500, deduct: 320, tax: 1100 },
    { name: "Mike Johnson", period: "Jan 2026", start: "2026-01-01", end: "2026-01-31", base: 5200, overtime: 520, bonus: 100, deduct: 180, tax: 860 },
    { name: "Sarah Williams", period: "Jan 2026", start: "2026-01-01", end: "2026-01-31", base: 5800, overtime: 200, bonus: 0, deduct: 200, tax: 870 },
    { name: "Chris Wilson", period: "Jan 2026", start: "2026-01-01", end: "2026-01-31", base: 4600, overtime: 380, bonus: 150, deduct: 140, tax: 750 },
    { name: "Angela Davis", period: "Jan 2026", start: "2026-01-01", end: "2026-01-31", base: 5400, overtime: 420, bonus: 0, deduct: 170, tax: 890 },
    { name: "Diana Patel", period: "Jan 2026", start: "2026-01-01", end: "2026-01-31", base: 6000, overtime: 0, bonus: 250, deduct: 300, tax: 980 },
  ];

  for (const pr of payrollRecords) {
    const netPay =
      pr.base + pr.overtime + pr.bonus - pr.deduct - pr.tax;
    await prisma.payroll.create({
      data: {
        employeeName: pr.name,
        period: pr.period,
        periodStart: new Date(pr.start),
        periodEnd: new Date(pr.end),
        basePay: pr.base,
        overtime: pr.overtime,
        bonuses: pr.bonus,
        deductions: pr.deduct,
        taxes: pr.tax,
        netPay,
        status: pr.period === "Dec 2025" ? "paid" : "pending",
        paidDate: pr.period === "Dec 2025" ? new Date("2026-01-05") : null,
        tenantId: tenant.id,
      },
    });
  }

  console.log("Seed completed successfully!");
  console.log(`  Tenant: ${tenant.name}`);
  console.log(`  Login:  admin@asuite.com / password123`);
  console.log(`  Employees: ${employees.length}`);
  console.log(`  Drivers: ${drivers.length}`);
  console.log(`  Vehicles: ${vehicles.length}`);
  console.log(`  Loads: ${loadData.length}`);
  console.log(`  Payroll records: ${payrollRecords.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
