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
    mailId: {type: String, unique: true},
    password: String,
});

var avatar = new Schema({
    name: {type: String},
    size: {type: Number},
    type: {type: String},
    imageUrl:{type: String},
    mailId: {type: String, unique: true}
})

var registereduser = new Schema({
    phoneNo:{type: Number},
    gender: {type: String},
    dob: {type:Date},
    address: {type:String},
    signUpUser: {type: Schema.Types.ObjectId, ref: 'SignupUser'},
    avatar: {type: Schema.Types.ObjectId, ref: 'avatar'}
})

//creating model
module.exports.ProductList = mongoose.model('ProductList', productListSchema)
module.exports.SignupUser = mongoose.model('SignupUser', signupUser);
module.exports.Avatar = mongoose.model('Avatar', avatar);
module.exports.Registereduser = mongoose.model('Registereduser', registereduser);
