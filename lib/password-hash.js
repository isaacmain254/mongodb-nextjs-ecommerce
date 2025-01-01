import { compare, genSalt, hash } from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await genSalt(12);
  return hash(password, salt);
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
