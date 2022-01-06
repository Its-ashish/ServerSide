var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TeachLeapApp');

//creating schema
var productListSchema = new Schema({
    id:String,
    brand:String,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    rating: {
        rate:Number,
        count:Number
    }
});

var signupUser = new Schema({
    firstName: String,
    lastName: String,
    mailId: String,
    password: String,
});

//creating model
module.exports.ProductList = mongoose.model('ProductList', productListSchema)
module.exports.SignupUser = mongoose.model('SignupUser', signupUser);
