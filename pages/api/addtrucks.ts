import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle adding a new truck
    try {
      const { license, make, model, year, status, company, tracker } = req.body;

      if (!license || !make || !model || !year || !status || !company || !tracker) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newTruck = await prisma.truck.create({
        data: {
          license,
          make,
          model,
          year,
          status,
          company,
          tracker,
        },
      });

      res.status(201).json(newTruck);
    } catch (error) {
      console.error('Error adding truck:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else if (req.method === 'GET') {
    // Handle fetching all trucks
    try {
      const trucks = await prisma.truck.findMany();
      res.status(200).json(trucks);
    } catch (error) {
      console.error('Error fetching trucks:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
