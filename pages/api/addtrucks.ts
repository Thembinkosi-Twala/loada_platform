import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { license, make, model, year, status, tracker, company } = req.body;

      // Validate data
      if (!license || !make || !model || !year || !status || !tracker || !company) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Insert data into the database
      const newTruck = await prisma.truck.create({
        data: {
          license,
          make,
          model,
          year,
          status,
          tracker,
          company, // Ensure company is passed
        },
      });

      res.status(201).json(newTruck);
    } catch (error) {
      console.error('Error adding truck:', error); // Log error for debugging
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
