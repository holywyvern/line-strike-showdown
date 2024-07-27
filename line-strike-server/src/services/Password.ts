import bcrypt from "bcrypt";

export const Password = {
  async hash(password: string) {
    return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS || "11", 10));
  },
  async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  },
};
