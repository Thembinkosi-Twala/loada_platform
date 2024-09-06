import bcrypt from "bcrypt"
import prisma from "../../../libs/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, name, password } = body

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
  data: {
    email,
    name,
   companyName: '', // Add this
    businessRegistrationNumber: '', // Add this
    physicalAddress: '', // Add this
    contactPersonName: '', // Add this
    contactPersonEmail: '', // Add this
    contactPersonPhone: '', // Add this
    bankDetails: {}, // Add this
    password: hashedPassword,
    isAdmin: false, // Add this
  },
})

  return NextResponse.json(user)
}