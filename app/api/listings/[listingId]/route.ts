import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/libs/db";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const containers = await db.container.deleteMany({
    where: {
      id: listingId,
    }
  });

  return NextResponse.json(containers);
}
