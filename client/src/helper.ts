import * as jose from "jose";

export const verifyJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(
    process.env.JWT_SECRET || "secret"
  );
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);
  return payloadJose.payload;
};
