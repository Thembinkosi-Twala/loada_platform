// pages/api/trucks.ts
import { PrismaClient, TruckStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set proper headers
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== "POST") {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { license, make, model, year, tracker, status } = req.body;

    // Validate required fields
    if (!license || !make || !model || !year || !tracker || !status ) {
      return res.status(400).json({ 
        message: "All fields are required." 
      });
    }

    // Check if the license is unique
    const existingTruck = await prisma.truck.findUnique({
      where: { license },
    });

    if (existingTruck) {
      return res.status(409).json({ 
        message: "A truck with this license plate already exists." 
      });
    }

    // Check if company exists
    // const company = await prisma.company.findUnique({
    //   where: { id: companyId },
    // });

    // if (!company) {
    //   return res.status(404).json({ 
    //     message: "Company not found." 
    //   });
    // }

    // Create new truck
    const newTruck = await prisma.truck.create({
      data: {
        license,
        make,
        model,
        year: Number(year),
        tracker,
        status: status as TruckStatus,
      },
      include: {
        company: true
      }
    });

    return res.status(201).json(newTruck);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ 
      message: "Internal server error." 
    });
  }
}