import * as dotenv from 'dotenv';

dotenv.config();

export const {
    PORT,DATABASE,SECRET
} = process.env;
