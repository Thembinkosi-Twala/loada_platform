
# App

Built with Next.js, TypeScript, Tailwind CSS, MongoDB, Prisma, Next auth, Leaflet and many other technologies.

## Features

- User registration and authentication
- Property listing and browsing
- Property booking and reservations
- Search and filtering of properties
- Interactive map using Leaflet to display property locations

## Demo

You can check the a live demo of the project [here](https://inter-dev-tech-final.vercel.app/).
  

## Prerequisites

Make sure you have the following software installed on your system:

- git If you want to clone the project from GitHub and work with it locally, you will need to have Git installed on your system. You can download and install Git from the official website (https://git-scm.com/).

- Node.js Application requires Node.js to be installed on your system in order to run. You can download and install the latest version of Node.js from the official website (https://nodejs.org/).

## Installation

- Clone the repository:

    ```
    git clone 
    ```
-  Navigate to the project directory:

    ```
    cd interdevtechfinal
    ```
-  Install the dependencies:

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

# cmd 
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted