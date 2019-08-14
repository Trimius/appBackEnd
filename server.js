const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 4000;
const userRoutes = require('./routes/users-routes');
const dataRoutes = require('./routes/dataRestaurant-routes');
app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todoData', { useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established succesfully");
})

function verifyToken(req, res, next) {
    //get Headers Value
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        //Split bearer header,   
        // we received the token like this: Authorization: Bearer <Token>
        const bearer = bearerHeader.split(' ')
        // get token
        const token = bearer[1];
        // set the token
        req.token = token;
        next();

    }else{
        // error "Forbidden message";
        res.status(403).json({
            success: false,
            message: 'Forbidden'
        });
    }
}



//Private
app.use('/todoData', verifyToken, dataRoutes);
//localhost:4000/users/
app.use('/users', userRoutes);

app.listen(port, function () {
    console.log('Server is running on port' + port);
})