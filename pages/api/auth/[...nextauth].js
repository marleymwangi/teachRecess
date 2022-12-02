import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;
        return signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            return user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(error);
            if (errorCode === "auth/user-not-found") {
              throw new Error("User not found");
            } else if (errorCode === "auth/wrong-password") {
              throw new Error("User credentials don't match");
            } else {
              let err = new Error(`${errorCode} ${errorMessage}`);
              throw err;
            }
          });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      //console.log("token");
      //console.log(JSON.stringify(token));
      //console.log("user");
      //console.log(JSON.stringify(user));
      //console.log("account");
      //console.log(JSON.stringify(account));
      // Initial sign in
      if (account && account?.provider === "credentials" && user) {
        let tokens = user.stsTokenManager;
        let usr = user?.providerData[0];
        usr.id = user.uid;
        usr.emailVerified = user.emailVerified;
        //removing unnecessary information
        delete usr.uid;
        delete usr.providerId;
        return {
          ...tokens,
          user: usr,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
});
