export default () => ({
  PORT: process.env.PORT,
  // DATABASE_URI: process.env.DATABASE_URI,
  JWT: {
    SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  },
});
