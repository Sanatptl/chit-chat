import jwt from "jsonwebtoken";

async function generateToken(userID, res) {
  const token = jwt.sign({ id: userID }, process.env.SECRETE_KEY_JWT, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    samesite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return token;
}

export default generateToken;
