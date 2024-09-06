// app/listings/route.ts

import { NextResponse } from "next/server";
import db  from "@/libs/db";

export const GET = async () => {
  try {
    const cargos = await db.container.findMany();
    return NextResponse.json(cargos);
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
