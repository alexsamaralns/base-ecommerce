require('dotenv/config');

const Auth = {
  secret: process.env.APP_SECRET,
  expiresIn: "1d"
};

module.exports = Auth;