require("dotenv").config();

export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const PORT = process.env.PORT;
export const POSTGRESS_URI = process.env.POSTGRESS_URI;
