// seed.ts or insertUser.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Define the user data
    const user = await prisma.user.create({
      data: {
        email: "example@example.com",
        name: "John Doe",
        companyName: "Doe Enterprises",
        businessRegistrationNumber: "1234567890",
        physicalAddress: "123 Elm Street",
        contactPersonName: "Jane Doe",
        contactPersonEmail: "jane.doe@example.com",
        contactPersonPhone: "555-1234",
        bankDetails: {
          accountHolderName: "John Doe",
          bankName: "Example Bank",
          accountNumber: "123456789",
          branchCode: "000123",
        },
        password: "securepassword123", // Ensure you hash passwords in a real application
      },
    });

    console.log("User created:", user);
  } catch (error) {
    console.error("Error inserting user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
