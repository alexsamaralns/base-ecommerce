const mysql = require('../config/mysql');
const { createPasswordHash } = require('../services/Auth');

class UsersController {
  async toggleTheme(req, res) {
    const { id, theme } = req.body;
    const values = [theme, id];

    try {
      const sqlTogglethemel = 'UPDATE USERS SET theme = ? WHERE id = ?;';
      const resultToggleTheme = await mysql.execute(sqlTogglethemel, values);

      return res.status(200).send('Theme changed!');
    } catch (err) {
      if (err) {
        console.log("error: ", err);
        return res.status(500).json({
          error: "Internal server error (toggleTheme).",
          message: err.message
        });
      }
    };
  };

  async showAllUsers(req, res) {
    try {
      const sql = `SELECT
                      u.id,
                      u.userName,
                      u.cpf_cnpj,
                      u.email,
                        u.userStatus,
                        p.phone
                      FROM
                      USERS u
                  LEFT JOIN(
                        SELECT
                          id_user,
                        phone,
                        ROW_NUMBER() OVER(PARTITION BY id_user ORDER BY created_at) AS row_num
                      FROM
                          PHONES
                      ) p ON u.id = p.id_user AND p.row_num = 1;
      `;
      const result = await mysql.execute(sql);
      return res.status(200).send(result);
    } catch (err) {
      if (err) {
        console.log("error: ", err);
        return res.status(500).json({
          error: "Internal server error (showAllUsers).",
          message: err.message
        });
      }
    };
  };

  async showUserById(req, res) {
    const id = req.params.id;

    try {
      const sql = 'CALL PR_GET_USER_BY_ID(?);';
      const result = await mysql.execute(sql, [id]);
      return res.status(200).send(result);
    } catch (err) {
      if (err) {
        console.log("error: ", err);
        return res.status(500).json({
          error: "Internal server error (showUserById).",
          message: err.message
        });
      }
    };
  };

  async showUserByEmail(email) {
    try {
      const sql = 'SELECT id, userName, email, type_user, theme, userPassword FROM USERS WHERE email = ?;';
      const result = await mysql.execute(sql, [email]);
      return result;
    } catch (err) {
      if (err) {
        return `Error: ${ err.message } `;
      }
    };
  };

  async createUser(req, res) {
    const { userName, cpf_cnpj, email, userPassword, addresses, phones, type_user, userStatus, theme } = req.body;
    const encryptedPassword = await createPasswordHash(userPassword);
    const values = [userName, cpf_cnpj, email, encryptedPassword, type_user, userStatus, theme, JSON.stringify(addresses), JSON.stringify(phones)];

    try {
      const sqlCheckEmail = 'SELECT email FROM USERS WHERE email = ? OR cpf_cnpj = ?';
      const resultCheckEmail = await mysql.execute(sqlCheckEmail, [email, cpf_cnpj]);

      if (resultCheckEmail.length > 0) {
        return res.status(200).send('User already exists!');
      }

      const sqlCreateUser = 'CALL PR_CREATE_USER(?, ?, ?, ?, ?, ?, ?, ?, ?);';
      await mysql.execute(sqlCreateUser, values);
      return res.status(200).send('User registred!');
    } catch (err) {
      if (err) {
        console.log("error: ", err);
        return res.status(500).json({
          error: "Internal server error.",
          message: err.message
        });
      }
    };
  };

  async updateUser(req, res) {
    const { id, userName, cpf_cnpj, email, userPassword, addresses, phones, } = req.body;
    let auxPassword = userPassword
    const values = [id, userName, cpf_cnpj, email, userPassword, JSON.stringify(addresses), JSON.stringify(phones)];

    try {
      const sqlCheckPassword = 'SELECT id FROM USERS WHERE userPassword = ?';
      const resultCheckPassword = await mysql.execute(sqlCheckPassword, [userPassword]);

      if (resultCheckPassword.length === 0) {
        auxPassword = await createPasswordHash(userPassword);
      }

      const sqlUpdateUser = 'CALL PR_UPDATE_USER(?, ?, ?, ?, ?, ?, ?);';
      await mysql.execute(sqlUpdateUser, values);
      return res.status(200).send('User updated!');
    } catch (err) {
      if (err) {
        console.log("error: ", err);
        return res.status(500).json({
          error: "Internal server error.",
          message: err.message
        });
      }
    };
  };

  async deleteUser(req, res) {
    const id = req.params.id;

    try {
      const sql = 'CALL PR_DELETE_USER(?);';
      const result = await mysql.execute(sql, [id]);
      return res.status(200).send('User deleted!');
    } catch (err) {
      if (err) {
        console.log("error: ", err);
        return res.status(500).json({
          error: "Internal server error.",
          message: err.message
        });
      }
    };
  };
}

module.exports = new UsersController();
