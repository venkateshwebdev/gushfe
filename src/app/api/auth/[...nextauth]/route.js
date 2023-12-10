import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone: {
          label: "Email",
          type: "text",
          placeholder: "johdoe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        const data = await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/login`,
          data: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });
        const user = data.data;
        if (user) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user)
        return {
          ...token,
          ...user,
        };
      return token;
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/auth",
  },
});

export { handler as GET, handler as POST };
