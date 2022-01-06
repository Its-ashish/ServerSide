const db = require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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

app.post('/sign-up', (request, response) => {
    var newUser = new db.SignupUser();
    newUser.firstName = request.body.firstName;
    newUser.lastName = request.body.lastName;
    newUser.mailId = request.body.mailId;
    newUser.password = request.body.password;
    newUser.save((err, result) => {
        if(err){
            response.send("Error Occured in backend", err)
        } else{
            response.send({"returnVal":'User Registered Successfully!'});
        }
    })
});


app.listen(PORT, ()=> {
    console.log('Server started at port', PORT)
})