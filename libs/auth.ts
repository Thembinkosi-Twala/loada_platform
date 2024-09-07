import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import db from "./db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Ensure email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        // Check if user exists
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with that email.");
        }

        // Check if password matches
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrectPassword) {
          throw new Error("Incorrect password.");
        }

        // Return user data if credentials are valid
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/", // Redirect to the main page if login fails
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
