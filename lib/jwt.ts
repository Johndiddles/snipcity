import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.EXTENSION_JWT_SECRET!;

export function generateExtensionToken(user: { id: string; email: string }) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      purpose: "vscode-extension",
    },
    JWT_SECRET,
    {
      expiresIn: "90d",
      issuer: "snippit-app",
      audience: "vscode-client",
    }
  );
}

export function verifyExtensionToken(token: string): {
  id: string;
  email: string;
} {
  const payload = jwt.verify(token, JWT_SECRET) as {
    sub: string;
    email: string;
    purpose: string;
  };

  if (payload.purpose !== "vscode-extension") {
    throw new Error("Invalid token purpose");
  }

  return {
    id: payload.sub,
    email: payload.email,
  };
}
