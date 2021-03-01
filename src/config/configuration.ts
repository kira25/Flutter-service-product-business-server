import * as dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  DATABASE,
  DATABASE_TEST,
  SECRET,
  S3_ENDPOINT,
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY,
  BUCKET_NAME,
} = process.env;
