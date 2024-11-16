import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { id } = req.query;

    try {
        // Delete the container with the specified ID using Prisma
        const result = await prisma.container.delete({
            where: { id: id as string },
        });

        return res.status(200).json({ message: "Container deleted successfully", result });
    } catch (error: any) {
        console.error("Failed to delete container:", error);

        if (error.code === "P2025") {  // Prisma code for 'Record not found'
            return res.status(404).json({ message: "Container not found" });
        }
        
        res.status(500).json({ message: "An error occurred while deleting the container" });
    } finally {
        await prisma.$disconnect();
    }
}
