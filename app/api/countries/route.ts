// app/countries/route.ts

import { NextResponse } from "next/server";
import { db } from "@/libs/db";

interface IParams {
  containerNumber?: string;
  size?: string;
}

export const GET = async (req: Request, { params }: { params: IParams }) => {
  try {
    const { containerNumber, size } = params;

    const cargos = await db.container.findMany({
      where: {
        containerNumber: containerNumber || undefined,
        size: size || undefined,
      },
    });

    return NextResponse.json(cargos);
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
