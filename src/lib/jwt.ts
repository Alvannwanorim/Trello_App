import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
};

export const decrypt = async (input: string) => {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
};
