import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { neon } from "@neondatabase/serverless";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account }) {
      try {
        const sql = neon(process.env.POSTGRES_URL!);
        const email = user.email;
        const name = user.name;

        if (!email || !name) return `/login?error=server-error`;

        const isUserExists = await sql`SELECT * FROM users WHERE email=${email}`;

        if (isUserExists.length > 0 && isUserExists[0].provider === "local") {
          return `/login?error=use-local-account`;
        }

        if (isUserExists.length === 0) {
          await sql`
            INSERT INTO users (name, email, provider, google_id)
            VALUES (${name}, ${email}, 'google', ${account?.providerAccountId})
          `;
        }

        return true;
      } catch (err) {
        console.error("Sign-in error:", err);
        return `/login?error=server-error`;
      }
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};