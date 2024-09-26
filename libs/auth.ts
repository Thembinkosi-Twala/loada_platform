import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import db from "./db"; // Ensure you have a proper Prisma client setup

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    // Google authentication provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Credentials provider for email/password login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Ensure both email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        // Look for user with the provided email
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with that email.");
        }

        // Check password against stored hash
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrectPassword) {
          throw new Error("Incorrect password.");
        }

        // If authentication is successful, return the user object
        return user;
      },
    }),
  ],

  pages: {
    signIn: "/", // Redirect to main page on failed login
  },

  session: {
    strategy: "jwt", // Use JWT for session management
  },

  secret: process.env.NEXTAUTH_SECRET, // Ensure you have this in your environment
};
