// app/reservations/route.ts

import { NextResponse } from "next/server";
import  db  from "@/libs/db";

export const POST = async (req: Request) => {
  try {
    const { userId, containerId, timeslotId } = await req.json();

    const booking = await db.booking.create({
    data: {
      userId,
      user: { connect: { id: userId } }, // Connect to the user
      containerId,
      container: { connect: { id: containerId } }, // Connect to the container
      timeslotId,
      timeslot: { connect: { id: timeslotId } }, // Connect to the timeslot
      referenceNumber: '', // Add this
    },
  });
    return NextResponse.json(booking);
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
 