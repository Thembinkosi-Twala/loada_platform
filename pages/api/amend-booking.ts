import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { bookingId, newTruckId } = req.body;

    try {
      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { truckId: newTruckId },
      });
      res.status(200).json(updatedBooking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating booking' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
