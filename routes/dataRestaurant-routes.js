const express = require('express');
const router = express.Router();
const tasksController = require('../app/api/controllers/dataRestaurant');

router.get('/', tasksController.getAllRestaurants);
router.post('/create', tasksController.createRestaurants);
router.post('/update/:id', tasksController.updateRestaurants);
router.post('/delete', tasksController.deleteRestaurants)

module.exports = router;