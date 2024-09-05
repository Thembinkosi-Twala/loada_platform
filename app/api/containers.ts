// pages/api/containers.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";
import { LISTINGS_BATCH } from "@/constants";

const getContainers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status, page = 1 } = req.query;
  const pageNumber = parseInt(page as string, 10);

  try {
    const containers = await prisma.container.findMany({
      where: {
        // Filter containers based on status
        status: status === 'available' ? 'available' : undefined,
      },
      skip: (pageNumber - 1) * LISTINGS_BATCH,
      take: LISTINGS_BATCH,
    });

    const totalCount = await prisma.container.count({
      where: {
        // Filter containers based on status
        status: status === 'available' ? 'available' : undefined,
      }
    });

    res.status(200).json({
      items: containers,
      nextPage: pageNumber * LISTINGS_BATCH < totalCount ? pageNumber + 1 : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export default getContainers;
