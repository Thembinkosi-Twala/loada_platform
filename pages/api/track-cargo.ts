// pages/api/track-cargo.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { containerNumber } = req.body;

    try {
      // Get container status from Navis
      const containerStatus = await getContainerStatusFromNavis(containerNumber);

      // If in transit, fetch truck location
      let truckLocation;
      if (containerStatus === 'IN_TRANSIT') {
        truckLocation = await getTruckLocationFromTracker(containerNumber);
      }

      res.status(200).json({ containerStatus, truckLocation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error tracking cargo' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
