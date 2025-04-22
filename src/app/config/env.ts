import dotenv from 'dotenv';
dotenv.config(); // You can explicitly specify the path

export const env = {
  jwtSecret: process.env.JWT_SECRET,
};
