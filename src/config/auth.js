import "dotenv/config";

export default {
  secret: process.env.SECRET,
  expiresIn: process.env.EXPIRES,
};
