import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import  db  from "@/libs/db";

interface IParams {
  containerId?: string;
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { containerId } = params;

  if (!containerId || typeof containerId !== "string")
    throw new Error("Invalid ID");



  return NextResponse.json({ status: "success" });
};
