const jwt = require('jsonwebtoken');
const { checkPassword } = require('../services/Auth');
const UserController = require('../controllers/UsersController');
const authConfig = require('../config/Auth');

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await UserController.showUserByEmail(email);

    if (user.length === 0) {
      return res.status(200).json({ error: "User / password invalid!" });
    }

    const resultCheck = await checkPassword(user[0].userPassword, password);

    if (!resultCheck) {
      return res.status(200).json({ error: "User / password invalid!" });
    }

    const userInfo = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      type_user: user[0].type_user,
      theme: user[0].theme,
    };
    
    return res.json({
      userInfo,
      token: jwt.sign({ userInfo }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      }),
      message: 'Access authorized!',
    });
  };
}

module.exports = new SessionController();
