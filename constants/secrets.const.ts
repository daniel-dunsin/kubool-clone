import { config } from "dotenv";

config();

const secrets = {
  port: <string>process.env.PORT,
  jwtSecret: <string>process.env.JWT_SECRET,
  databaseUrl: <string>process.env.DATABASE_URL,
};

export default secrets;
