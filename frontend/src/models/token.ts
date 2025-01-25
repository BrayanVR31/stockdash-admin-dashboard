import { JwtPayload } from "jwt-decode";

interface TokenPayload extends JwtPayload {
  id: string;
}

export type { TokenPayload };
