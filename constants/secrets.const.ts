import { config } from "dotenv";

config();

const secrets = {
  port: <string>process.env.PORT,
  jwtSecret: <string>process.env.JWT_SECRET,
  databaseUrl: <string>process.env.DATABASE_URL,
  nodeEnv: <string>process.env.NODE_ENV,
  google: {
    clientId: <string>process.env.GOOGLE_CLIENT_ID,
    clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
  },
  email: {
    user: <string>process.env.NODEMAILER_USER,
    pass: <string>process.env.NODEMAILER_PASS,
  },
  frontendUrl: <string>process.env.FRONTEND_URL,
};

export default secrets;
