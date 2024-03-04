import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
  ],
  // Add generateStaticParams() function
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // Will disable the new account creation screen
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },


  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  events: {
    async signIn(message) { /* on successful sign in */ },
    async signOut(message) { /* on sign out */ },
    async createUser(message) { /* user created */ },
    async linkAccount(message) { /* account linked to a user */ },
    async session(message) { /* session is active */ },
    async error(message) { /* error in authentication flow */ },
  },
})

export { handler as GET, handler as POST }