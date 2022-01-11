const db = require('./database.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/productList', (request,response) => {
    db.ProductList.find({}, '-_id', (err,result) => {
        if(err){
            console.log('Error occured in backend');
            return err
        }else{
            console.log('Data sent');
            response.json(result);
        }
    });
});

app.post('/sign-up', async (request, response) => {
    const {firstName,lastName,  mailId, password} = request.body;
    const alreadyExistingUser = await db.SignupUser.findOne({mailId});
    if(alreadyExistingUser){
        console.log(alreadyExistingUser, '11111');
        return response.status(409).json('Already existing User. Please login!')
    }
    console.log('222222');
    var newUser = new db.SignupUser();
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.mailId = mailId;
    newUser.password = hashedPassword;
    console.log(newUser);
    newUser.save((err, result) => {
        if(err){
            response.status(500).json("Error Occured in backend", err)
        } else{
            response.status(200).send({"returnVal":'User Registered Successfully!'});
        }
    })
});


app.listen(PORT, ()=> {
    console.log('Server started at port', PORT)
})