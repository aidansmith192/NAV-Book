/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const {register, login, logout, session} =
 require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/session', authenticate, session);

module.exports = router;
