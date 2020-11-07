const router = require('express').Router();
const userController = require('../controllers/user.controller');
const {loggedIn, adminOnly} = require('../helper/auth.middleware')

router.get('/all', userController.getAll);

// Register a new User
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Auth user only
router.get('/authuseronly', loggedIn, userController.authuseronly);

// Admin user only
router.get('/adminonly', loggedIn, adminOnly, userController.adminonly);

module.exports = router;
