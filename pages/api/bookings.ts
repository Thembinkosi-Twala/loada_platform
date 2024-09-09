import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, containerId, timeslotId, truckId } = req.body;

    try {
      const referenceNumber = await getReferenceNumberFromNavis(containerId);
      const towerLocation = await getTowerLocationFromNavis(containerId);

      const booking = await prisma.booking.create({
        data: {
          userId,
          containerId,
          timeslotId,
          truckId,
          referenceNumber,
          towerLocation,
          status: 'PENDING',
        },
      });
      
      res.status(200).json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating booking' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
