import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Token } from "@/models";

// Types
interface Credentials {
  email: string;
  password: string;
}

interface AuthError {
  message: string;
  statusCode: number;
  type?: string;
}

interface AuthResult {
  error: AuthError | null;
  userRef?: string;
}
type VerifyAuth = (credentials: Credentials) => Promise<AuthResult>;

/**
 * Verify the credentials of the user
 * */
const verifyCredentials: VerifyAuth = async ({
  email,
  password,
}: Credentials) => {
  try {
    const authUser = await User.findOne({ email });

    // Return error if user not found or invalid email
    if (!authUser)
      return {
        error: {
          message: "User not found or invalid email",
          statusCode: 401,
          type: "INVALID_EMAIL",
        },
      };

    // Return error if password is invalid
    const dbPass = authUser.password;
    const hasValidPassword = await bcrypt.compare(password, dbPass);
    if (!hasValidPassword)
      return {
        error: {
          message: "Invalid password",
          statusCode: 401,
          type: "INVALID_PASSWORD",
        },
      };
    const userRef = authUser._id.toHexString();
    return { error: null, userRef };
  } catch (e) {
    return {
      error: {
        message: "The authentication user failed on unexpected way",
        statusCode: 500,
      },
    };
  }
};

/**
 * Create a visible by user session token and saved it in the database
 * */
const createAuthToken = async (id: string) => {
  try {
    const { JWT_SECRET_WORD: secretWord = "JWT_PASS" } = process.env;
    // Create an access token based on the user id
    const access = jwt.sign({ id }, secretWord, { expiresIn: 15 * 60 }); // 15 minutes
    const refresh = jwt.sign({ id }, secretWord, { expiresIn: "7d" }); // 7 days

    // Save the token in the database
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await Token.create({ userId: id, token: refresh, expiredAt });
    return {
      token: {
        access,
        refresh,
      },
    };
  } catch (error) {
    return { token: null };
  }
};

/**
 * Restore the session token from the database
 * */
const restoreAuthToken = async (cookieToken: string) => {
  try {
    const storedToken = await Token.findOne({ token: cookieToken });
    if (!storedToken) return;
    const { JWT_SECRET_WORD: secretWord = "JWT_PASS" } = process.env;
    const payload = jwt.verify(storedToken.token, secretWord);
    const accessToken = jwt.sign(
      { id: (payload as jwt.JwtPayload).id },
      secretWord,
      {
        expiresIn: 15 * 60, // 15 minutes
      }
    );
    return accessToken;
  } catch (error) {
    return null;
  }
};

/** Destroy access token from db */
const destroyAuthToken = async (token: string) => {
  try {
    const authToken = await Token.findOneAndDelete({ token });
    if (!authToken) throw new Error("The token is invalid");
    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: {
          type: "FAILED_SESSION_DESTRUCTION",
          message: error.message,
        },
      };
    }
  }
};

export {
  verifyCredentials,
  createAuthToken,
  restoreAuthToken,
  destroyAuthToken,
};
