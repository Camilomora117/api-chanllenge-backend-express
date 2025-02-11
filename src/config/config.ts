import dotenv from "dotenv";

dotenv.config();

export const environments = {
  PORT: process.env.PORT || "5000",
  NODE_ENV: process.env.NODE_ENV || "Dev",
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://mongo:mongo@cluster-test.0ucqb.mongodb.net/dbTest?retryWrites=true&w=majority",
};
