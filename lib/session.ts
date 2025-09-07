// This file configures the iron-session cookie settings used for admin authentication
import { SessionOptions } from "iron-session";

export interface AdminSession {
  isLoggedIn: boolean;
  username?: string;
}

// This is where we define our session options
export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "serp-scale-ai-admin-session",
  cookieOptions: {
    // Set to true in production if you're using HTTPS
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};

// Utility function to get the default session state
export function defaultSession(): AdminSession {
  return {
    isLoggedIn: false,
  };
}

// Utility function to validate required environment variables are set
export function validateAuthConfig() {
  const requiredVars = [
    "ADMIN_USERNAME",
    "ADMIN_PASSWORD",
    "SECRET_COOKIE_PASSWORD",
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`⚠️ Missing required environment variables: ${missingVars.join(', ')}`);
    console.error('Please add these to your .env.local file and restart the server.');
    return false;
  }
  
  if ((process.env.SECRET_COOKIE_PASSWORD?.length || 0) < 32) {
    console.error('⚠️ SECRET_COOKIE_PASSWORD should be at least 32 characters long');
    return false;
  }
  
  return true;
}
