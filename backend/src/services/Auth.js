const bcrypt = require('bcryptjs');

const createPasswordHash = async (password) =>
  bcrypt.hash(password, 8);

const checkPassword = (user, password) =>
  bcrypt.compare(password, user);

module.exports = {
  createPasswordHash,
  checkPassword,
};
