import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { neon } from "@neondatabase/serverless";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" as const },

  callbacks: {
    // 🔹 Handle sign-in logic and DB operations
    async signIn({ user, account, profile }) {
      try {
        const sql = neon(process.env.POSTGRES_URL!);
        const email = user.email;
        const name = user.name;

        if (!email || !name) {
          // Missing info → stop login
          return `/login?error=server-error`;
        }

        const isUserExists = await sql`SELECT * FROM users WHERE email=${email}`;

        if (isUserExists.length > 0 && isUserExists[0].provider === "local") {
          // Block Google login for existing local users
          return `/login?error=use-local-account`;
        }

        if (isUserExists.length === 0) {
          // Insert new Google user
          await sql`
            INSERT INTO users (name, email, provider, google_id)
            VALUES (${name}, ${email}, 'google', ${account?.providerAccountId})
          `;
        }

        return true; // ✅ allow login
      } catch (err) {
        console.error("Sign-in error:", err);
        return `/login?error=server-error`;
      }
    },

    // 🔹 Attach JWT info
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.picture;
      }
      return token;
    },

    // 🔹 Attach token info to session
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.picture = token.picture;
      return session;
    },
  },

  // Optional: redirect after login/logout
  pages: {
    signIn: "/login",
    error: "/login", // NextAuth will append ?error=...
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
