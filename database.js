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
})

//creating model
module.exports = mongoose.model('ProductList', productListSchema)


