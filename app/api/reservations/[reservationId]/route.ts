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

  const reservation = await db.container.deleteMany({
    where: {
      id: containerId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json({ status: "success" });
};
