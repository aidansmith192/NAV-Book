const bcrypt = require('bcrypt');
const pool = require('../pool');

const register = async (req, res) => {
  const {email, phoneNumber, password, firstName, lastName} = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    // if (err) res.status(500).send('Server Error');

    const query = {
      /* eslint max-len: ["error", { "code": 200 }]*/
      text: 'INSERT INTO "user"(email, phoneNumber, hash, firstName, lastName) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [email, phoneNumber, hash, firstName, lastName],
    };

    pool.query(query)
      .then((user) => {
        req.session.user = {
          id: user.rows[0].id,
          email: user.rows[0].email,
          firstName: user.rows[0].firstname,
          lastName: user.rows[0].lastname,
          phoneNumber: user.rows[0].phonenumber,
        };
        return res.status(200).json({
          email: user.rows[0].email,
          firstName: user.rows[0].firstname,
          lastName: user.rows[0].lastname,
          phoneNumber: user.rows[0].phonenumber,
        });
      })
      .catch((e) => {
        if (e.code === '23505') {
          if (e.constraint === 'user_email_key') {
            return res.status(409).json({error: 'email taken'});
          } else {
            return res.status(409).json({error: 'phoneNumber taken'});
          }
        } else {
          return res.status(500).send('Server Error');
        }
      });
  });
};

const login = async (req, res) => {
  const {email, phoneNumber, password} = req.body;

  let query;
  if (email) {
    query = {
      text: 'SELECT * FROM "user" WHERE email = $1',
      values: [email],
    };
  } else {
    query = {
      text: 'SELECT * FROM "user" WHERE phoneNumber = $1',
      values: [phoneNumber],
    };
  }

  pool.query(query)
    .then((user) => {
      if (user.rows.length === 0) {
        res.status(401).send('Username or password incorrect');
      } else {
        bcrypt.compare(password, user.rows[0].hash, (err, result) => {
          // if (err) res.status(500).send('Server Error');
          if (result) {
            req.session.user = {
              id: user.rows[0].id,
              email: user.rows[0].email,
              firstName: user.rows[0].firstname,
              lastName: user.rows[0].lastname,
              phoneNumber: user.rows[0].phonenumber,
            };
            return res.status(200).json({
              email: user.rows[0].email,
              firstName: user.rows[0].firstname,
              lastName: user.rows[0].lastname,
              phoneNumber: user.rows[0].phonenumber,
            });
          } else {
            return res.status(401).send('Username or password incorrect');
          }
        });
      }
    });
};

const logout = async (req, res) => {
  req.session.destroy(() => {
    return res.status(200).send('logout OK');
  });
};

const session = async (req, res) => {
  // lets the client know they have a valid session
  // and who they are logged in as
  res.status(200).json({
    email: req.session.user.email,
    phoneNumber: req.session.user.phoneNumber,
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
  });
};

module.exports = {
  register,
  login,
  logout,
  session,
};
