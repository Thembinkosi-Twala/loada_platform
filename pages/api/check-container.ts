import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { containerNumber } = req.body;

    // Check Transnet/Navis API for pre-advised container status
    const isPreAdvised = await checkWithNavis(containerNumber);

    if (!isPreAdvised) {
      res.status(400).json({ message: 'Container not pre-advised with Transnet' });
    } else {
      res.status(200).json({ message: 'Container pre-advised', containerNumber });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
