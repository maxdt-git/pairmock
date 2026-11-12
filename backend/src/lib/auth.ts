import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, twoFactor } from "better-auth/plugins";
import { prisma } from "./prisma.ts";

export const auth = betterAuth({
  appName: "PairMock",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "https://localhost:8443"],

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
    twoFactor({issuer: "PairMock"}),
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

