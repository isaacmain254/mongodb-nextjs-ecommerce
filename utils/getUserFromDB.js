import dbConnect from "@/lib/mongoose/dbConnect";
import { UserSchema } from "@/models/user";
import mongoose from "mongoose";

const getUserModel = () => {
  if (mongoose.models.User) {
    return mongoose.models.User;
  }
  return mongoose.model("User", UserSchema);
};
const getUserFromDB = async (email) => {
  // connect to mongodb database
  await dbConnect();
  const User = getUserModel();
  //user
  const user = await User.findOne({ email }).select("+password");
  return user;
};

export { getUserFromDB, getUserModel };
