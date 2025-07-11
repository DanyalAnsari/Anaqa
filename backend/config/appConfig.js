import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const DELIVERY_FEE = Number(process.env.DELIVERY_FEE);
