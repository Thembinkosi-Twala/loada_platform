import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, containerId, truckId, towerLocation, timeslotId } = req.body;

      // Validate required fields
      if (!userId || !containerId || !truckId || !towerLocation || !timeslotId) {
        return res.status(400).json({ message: 'All required fields must be provided.' });
      }

      // Generate a unique reference number
      const referenceNumber = generateReferenceNumber(containerId);

      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Check if the container exists
      const container = await prisma.container.findUnique({
        where: { id: containerId },
      });
      if (!container) {
        return res.status(404).json({ message: 'Container not found.' });
      }

      // Check if the truck exists
      const truck = await prisma.truck.findUnique({
        where: { id: truckId },
      });
      if (!truck) {
        return res.status(404).json({ message: 'Truck not found.' });
      }

      // Insert the booking into the database
      const newBooking = await prisma.booking.create({
        data: {
          userId,
          containerId,
          truckId,
          towerLocation,
          referenceNumber,
          status: 'PENDING', // Default status
        },
      });

      return res.status(201).json(newBooking);
    } catch (error) {
      console.error('Error creating booking:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Function to generate a unique reference number
const generateReferenceNumber = (containerId: string): string => {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  return `B${containerId}${date}${randomNumbers}`;
};
