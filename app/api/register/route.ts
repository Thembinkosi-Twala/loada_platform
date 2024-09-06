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
   companyName: '', 
    businessRegistrationNumber: '', 
    physicalAddress: '', 
    contactPersonName: '', 
    contactPersonEmail: '', 
    contactPersonPhone: '',
    bankDetails: {},
    password: hashedPassword,
    isAdmin: false, 
  },
})

  return NextResponse.json(user)
}