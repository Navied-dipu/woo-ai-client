import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { admin } from "better-auth/plugins";

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dummy";
const client = new MongoClient(mongoUri);
const db = client.db("wooaiDB");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "user",
        input: true, // allows it to be set from signUp.email() payload
      },
      plan: {
        type: "string",
        default: "user_free",
        input: true,
      },
    },
  },
  
});
