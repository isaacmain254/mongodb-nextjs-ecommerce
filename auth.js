import NextAuth from "next-auth";
import { User } from "./models/user";
import dbConnect from "./lib/mongoose/dbConnect";
import { verifyPassword } from "./lib/password-hash";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email;
        const password = credentials.password;
        if (!email || !password) {
          throw new CredentialsSignin("Email and Password are required");
        }
        try {
          // connect to mongodb database
          await dbConnect();
          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Invalid email or password");
          }
          // compare the password with the hashed password
          const passwordMatch = await verifyPassword(password, user.password);
          if (!passwordMatch) {
            throw new Error("Password didn't match");
          }
          const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user._id,
          };

          return userData;
        } catch (err) {
          throw new Error("Something went wrong, please try again");
        }
      },
    }),
  ],
});
