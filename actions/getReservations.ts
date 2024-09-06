import db from "@/libs/db";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export const getReservations = async (
  params: IParams
) => {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};
        
    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const bookings = await db.booking.findMany({
      where: query,
      include: {
        container: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return JSON.parse(JSON.stringify(bookings))
  } catch (error: any) {
    throw new Error(error);
  }
}