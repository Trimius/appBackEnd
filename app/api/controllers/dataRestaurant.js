const Todo = require('../models/todo.model');
const jwt = require('jsonwebtoken');
const ModelRestaurant = require('../models/restaurantsModel');

const getAllRestaurants = (req, res) => {
    ModelRestaurant.find(function (err, data) {
        if (err) {
            const error = {
                succes: false,
                message: err
            };
            res.status(401).json(error);
        } else {
            res.status(200).json({
                sucess: true,
                message: data
            });
        }
    });
};
const createRestaurants = (req, res, next) => {
    ModelRestaurant.create({
        user: req.body.user,
        nombreRestaurant: req.body.nombreRestaurant,
        adress: req.body.adress,
        description: req.body.description

    }, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                message: "Cannot create this restaurant yet, try again"
            })
        } else {
            res.status(200).json({
                success: true,
                message: result
            })
        }
    })
}
/*const addRestaurants = (req, res) => {
    jwt.verify(req.token, 'palabra', (err, authData) => {
        if (err) {
            // error from JWT
            const error = {
                success: false,
                message: err
            }
            res.status(401).json(error)
        } else {
            // add data to Data Base
            let todo = new ModelRestaurant(req.body);  
            todo.save()
                .then(todo => {
                    res.status(200).json({
                        success: true,
                        message: 'Post created!',
                        authData
                    })
                })
                .catch(err => {
                    // error from Data Base
                    res.status(400).json({ success: false,
                        message: 'adding new todo failed'});
                });
        }
    })
}*/

const deleteRestaurants = (req, res) => {
    jwt.verify(req.token, 'palabra', (err, authData) => {
        if (err) {
            //error with JWT
            const error = {
                success: false,
                message: err
            }
        } else {
            //erase data from data base
            let id = req.body._id
            ModelRestaurant.deleteOne({ _id: id }, (err, response) => {
                if (err || response.deletedCount == 0) {
                    // return error from database
                    res.status(404).json({
                        success: false,
                        message: err,
                        count: response.deletedCount
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Deleted successfully!',
                        res: response
                    })
                }
            })
        }
    })
}

const updateRestaurants = async (req, res, next) => {
    // search
    const udapteInfo = await ModelRestaurant.findOne({_id: req.params.id});
    //set new data
    udapteInfo.nombreRestaurant = req.body.nombreRestaurant;
    const result = await udapteInfo.save();
    res.json(result);
    /*
    ModelRestaurant.findById(req.params.id, function (err, todo) {
        if (!todo) {
            const error = {
                sucess: false,
                message: "data is not found"
            }
            res.status(401).json(error)
        }
        else
            todo.todo_description = req.body.todo_description;
        ModelRestaurant.save().then(todo => {
            res.status(200).json({
                success: true,
                message: 'Todo updated!'
            });
        })
            .catch(err => {
                res.status(500).json({
                    sucess: false,
                    message: "Update not possible"
                });
            });
    }); */
}

module.exports = {
    createRestaurants,
    getAllRestaurants,
    deleteRestaurants,
    //addRestaurants,
    updateRestaurants
}