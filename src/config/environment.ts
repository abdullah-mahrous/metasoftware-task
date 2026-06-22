import { config } from "dotenv";
import jwt from 'jsonwebtoken'

config();

// setting fall-back values to .env vars
let envVars = {
  port: process.env.PORT || 3000,
  dbURI: process.env.DBURI || 'DBURI not louded from .env',
  jwt: {
    secret: process.env.JWT_SECRET || '50a3477ceb5dc957865d88b592c3ae575c7',
    expire: process.env.JWT_EXPIRE as jwt.SignOptions["expiresIn"] || '7d',
  },
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};

export default envVars
