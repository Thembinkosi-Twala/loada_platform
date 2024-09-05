import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export const GET = async (request: Request) => {
  const containerNumber = request.query.containerNumber;

  try {
    const cargoTrackingInfo = await db.container.findUnique({
      where: { containerNumber },
    });
    return NextResponse.json(cargoTrackingInfo);
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};