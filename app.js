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
        return response.status(409).json('Already existing User. Please login!')
    }
    var newUser = new db.SignupUser();
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.mailId = mailId;
    newUser.password = hashedPassword;

    newUser.save((err, result) => {
        if(err){
            response.status(500).json("Error Occured in backend", err)
        } else{
            const token = jwt.sign(
                {mailId: mailId},
                'RANDOM_TOKEN_SECRET',
                {expiresIn: '2h'}
            )
            response.status(200).send({"returnVal":'User Registered Successfully!', token: token});
        }
    })
});

app.post('/login', async(request, response) => {
    const loggedInUser = await db.SignupUser.findOne({mailId: request.body.username});
    if(loggedInUser && await bcrypt.compare(request.body.password, loggedInUser?.password)){
        const token = jwt.sign(
            {mailId: request.body.username},
            'RANDOM_TOKEN_SECRET',
            {expiresIn: '2h'}
        )
       return response.status(200).send({message: "Success", token: token})
    } if(!loggedInUser){
       return response.status(404).json("User Not Found")
    }else{
        response.status(400).json("Invalid Credentials")
    }
})


app.listen(PORT, ()=> {
    console.log('Server started at port', PORT)
})