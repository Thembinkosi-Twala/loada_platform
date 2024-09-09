
# App

Built with Next.js, TypeScript, Tailwind CSS, MongoDB, Prisma, Next auth, Leaflet and many other technologies.

## Installation

    ```
    npm install
    ```
-  Set up the environment variables:

   1. Create a `.env` file in the root directory.

   2. Add the following variables to the .env file, replacing the placeholder values with your own:

    ```
    DATABASE_URL=<your-mongodb-url>
    NEXTAUTH_SECRET=<your-nextauth-secret>
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    ```

## Usage

- Start the development server:

    ```
    npm run dev
    ```
- Open your browser and visit `http://localhost:3000` to access the application.

## prisma setup with mongodb atlas

# Install Prisma CLI and MongoDB Atlas CLI
npm install -g prisma
npm install -g mongodb-atlas-cli

# Create a Prisma schema file (e.g., schema.prisma)
model User {
  id       String   @id @default(cuid())
  name     String
  email    String   @unique
}

# Run Prisma db pull to generate a Prisma client
prisma db pull

# Run Prisma migrate dev to apply the Prisma schema to your local database
prisma migrate dev

# Run Prisma db push to push the Prisma schema to your MongoDB Atlas database
prisma db push

# cmd if you have any problems
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted


# page.tsx
<!-- import React from "react";
import Container from "@/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Listings from "@/components/listings/Listings";
import Dashboard from "@/pages/dashboard";

export const dynamic = "force-dynamic"; // Ensure this is set according to your use case

const Home = async () => {
    const currentUser = await getCurrentUser();

    return (
        <Container>
            <Dashboard />
        </Container>
    );
};

export default Home; -->