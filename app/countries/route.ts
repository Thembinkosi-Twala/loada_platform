import { NextResponse } from "next/server";
import db from "@/libs/db";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const containerNumber = url.searchParams.get("containerNumber") || undefined;
    const size = url.searchParams.get("size") || undefined;

    const cargos = await db.container.findMany({
      where: {
        containerNumber,
        size,
      },
    });

    return NextResponse.json(cargos);
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
