// app/reservations/route.ts

import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export const POST = async (req: Request) => {
  try {
    const { userId, containerId, timeslotId } = await req.json();

    const booking = await db.booking.create({
      data: {
        userId,
        containerId,
        timeslotId,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
