import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        email,
        name,
        companyName,
        businessRegistrationNumber,
        physicalAddress,
        contactPersonName,
        contactPersonEmail,
        contactPersonPhone,
        bankDetails,
        password
      } = req.body;

      // Validate the required fields
      if (
        !email ||
        !name ||
        !companyName ||
        !businessRegistrationNumber ||
        !physicalAddress ||
        !contactPersonName ||
        !contactPersonEmail ||
        !contactPersonPhone ||
        !password ||
        !bankDetails.accountHolderName ||
        !bankDetails.bankName ||
        !bankDetails.accountNumber ||
        !bankDetails.branchCode
      ) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if the email is already registered
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Insert new user into the database
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          companyName,
          businessRegistrationNumber,
          physicalAddress,
          contactPersonName,
          contactPersonEmail,
          contactPersonPhone,
          bankDetails: {
            accountHolderName: bankDetails.accountHolderName,
            bankName: bankDetails.bankName,
            accountNumber: bankDetails.accountNumber,
            branchCode: bankDetails.branchCode,
          },
          password: hashedPassword,
          isAdmin: false, // Default to false
        },
      });

      // Return the newly created user
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('User registration error:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
