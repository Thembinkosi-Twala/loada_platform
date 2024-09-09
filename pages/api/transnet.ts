// pages/api/transnet.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Dummy data or replace with real API integrations.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simulate fetching time slots or pre-advice check
    const { containerNumber, requestType } = req.query;

    switch (requestType) {
      case 'pre-advice':
        // Simulate checking with Transnet API
        const isPreAdvised = containerNumber === 'ABC1234567'; // Example check
        return res.status(200).json({ isPreAdvised });
      case 'time-slots':
        // Simulate fetching available time slots
        return res.status(200).json({ timeSlots: ['9:00 - 10:00', '10:00 - 11:00','11:00 - 12:00','12:00 - 13:00','13:00 - 14:00','14:00 - 15:00','15:00 - 16:00'] });
      default:
        return res.status(400).json({ error: 'Invalid request type' });
    }
  }

  if (req.method === 'POST') {
    const { containerNumber, timeSlotId } = req.body;
    // Simulate reference number generation
    const referenceNumber = `REF${Math.floor(Math.random() * 100000)}`;
    // Simulate tower location assignment
    const towerLocation = `Tower ${Math.floor(Math.random() * 10)}`;
    return res.status(200).json({ referenceNumber, towerLocation });
  }

  res.status(405).json({ message: 'Method not allowed' });
}
