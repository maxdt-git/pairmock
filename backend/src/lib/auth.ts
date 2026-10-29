import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import { prisma } from "./prisma.ts";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: ["http://localhost:3000"],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ["https://www.googleapis.com/auth/calendar.events"],
      accessType: "offline",
      prompt: "select_account consent",
    }
  },

  plugins: [
    openAPI(),
  ],

  user: {
    deleteUser: {
      enabled: true,
    }
  },
  
  account: {
    accountLinking: {
      allowDifferentEmails: true
    }
  },
});

