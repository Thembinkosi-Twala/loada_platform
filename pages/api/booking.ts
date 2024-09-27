import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Destructure necessary fields from the request body
      const { userId, containerId, timeslotId, towerLocation, truckId } = req.body;

      // Validate data
      if (!userId || !containerId || !towerLocation || !truckId) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }

      // If you need timeslotId to be validated, ensure it is in the schema, otherwise remove this validation
      if (!timeslotId) {
        return res.status(400).json({ message: 'timeslotId is required' });
      }

      // Generate reference number (you can modify this logic as needed)
      const referenceNumber = generateReferenceNumber(containerId);

      // Insert data into the database
      const newBooking = await prisma.booking.create({
        data: {
          userId,            // Ensure userId is included
          containerId,       // Ensure containerId is included
          truckId,           // Ensure truckId is included
          referenceNumber,   // Automatically generated
          towerLocation,     // Provided in the request
          status: 'PENDING', // Default status
        },
      });

      res.status(201).json(newBooking);
    } catch (error) {
      console.error('Error adding booking:', error); // Log error for debugging
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Function to generate reference number
const generateReferenceNumber = (containerId: string): string => {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, ''); // Format date as YYYYMMDD
  const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate 4 random digits
  return `B${containerId}${date}${randomNumbers}`;
};
