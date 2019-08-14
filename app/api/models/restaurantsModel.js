const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const RestaurantSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    nombreRestaurant: {
        type: String,
        required: true 
    },
    adress: {
        type: String,
        required: true 
    },
    photos: {
        type: String,
    },
    description: {
        type: String,
    }
})

RestaurantSchema.pre('save', function (next) {
    console.log('El restaurante ha sido guardado correctamente');
    next();
})

//create Schema
const NewRestaurantSchema = new Schema();


module.exports = mongoose.model('restaurants', NewRestaurantSchema);