import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

interface Payload {
  id: bigint;
  email: string;
}

const ISSUER = "https://linestrike.ar";
const AUDIENCE = "Line Strike Players";

export const AuthToken = {
  async generate(payload: Payload) {
    return jwt.sign(payload, SECRET_KEY, {
      expiresIn: "14d",
      issuer: ISSUER,
      audience: AUDIENCE,
    });
  },
  async verify(token: string) {
    return jwt.verify(token, SECRET_KEY, {
      issuer: ISSUER,
      audience: AUDIENCE,
    }) as Payload;
  },
};
