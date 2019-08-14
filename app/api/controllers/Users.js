const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const create = (req, res, next) => {
    userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    }, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                message: "Cannot create this user Yet, try another one"
            })
        } else {
            res.status(200).json({
                success: true,
                message: result
            })
        }
    })
}


/*const anotherCreate = (req, res, next) => {
    const newUser = new userModel(req.body);
    newUser.save().then((data) => {
        res.status(200).json({
            success: true,
            message: data
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Cannot Register this user now, try another one'
        })
    })
}*/
const login = (req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    userModel.findOne({ email: user.email }, function (err, userData) {
        if (err) {
            const error = {
                success: false,
                error: err
            };
            res.status(404).json(error);
        } else {
            if (userData != null && bcrypt.compareSync(req.body.password, userData.password)) {
                const token = jwt.sign({ user }, 'palabra', function (err, token) {
                    if (!err) {
                        res.status(200).json({
                            success: true,
                            username: userData,
                            token: token,
                        })
                    } else {
                        res.status(500).json({
                            success: false,
                            error: err
                        })
                    }
                })
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Incorrect Password'
                })
            }
        }
    })
}

module.exports = {
    create,
    //anotherCreate,
    login
}