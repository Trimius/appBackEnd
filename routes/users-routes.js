const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/Users');
// localhost:4000/users/login
router.post('/login', userController.login);
router.post('/register-user', userController.create);
router.post('/users-create', userController.anotherCreate);

module.exports = router;