
import { OAuth2Client } from "google-auth-library";
const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    req.user = ticket.getPayload();
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
