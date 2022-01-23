import "express-session";

// express-session Options || key-value types added 
declare module "express-session" {
  interface SessionOptions {
    key: string;
  }
  interface Session {
    userID: string,
    userAgent: string
  }
}
