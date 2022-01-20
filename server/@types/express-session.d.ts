import "express-session";

// expres-session Options key value type added 
declare module "express-session" {
  interface SessionOptions {
    key: string;
  }
}
