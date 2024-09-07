import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { containerNumber, size, type, status, location } = req.body;
      
      // Validate data
      if (!containerNumber || !size || !type || !status || !location) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Insert data into the database
      const newContainer = await prisma.container.create({
        data: {
          containerNumber,
          size,
          type,
          status,
          location,
        },
      });

      res.status(201).json(newContainer);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
