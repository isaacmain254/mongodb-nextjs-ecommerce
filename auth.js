import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongoose/dbConnect";
import { verifyPassword } from "./lib/password-hash";
import User from "./models/user";
// import { getUserFromDB } from "./utils/getUserFromDB";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        console.log("Credentials", credentials);
        // const email = "test@gmail.com";
        // const password = credentials.password;
        const email = credentials.email;
        const password = credentials.password;
        console.log("Email password", email, password);
        if (!email || !password) {
          throw new CredentialsSignin("Email and Password are required");
        }
        try {
          // connect to mongodb database
          await dbConnect();
          // find the user with the email
          user = await User.findOne({ email: email }).select("+password");
          if (!user) {
            throw new Error("Invalid email or password");
          }
          // // compare the password with the hashed password
          const passwordMatch = await verifyPassword(password, user.password);
          console.log("password matched");
          if (!passwordMatch) {
            throw new Error("Password didn't match");
          }
          const userData = {
            email: user.email,
            id: user._id,
          };
          console.log("User data", userData);
          return userData;
        } catch (err) {
          console.log("Error", err);
          throw new Error("Something went wrong, please try again", err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Customize this to your sign-in page
    // error: "/auth/error", // Customize this to your error page
  },
});
