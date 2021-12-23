const db = require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/productList', (request,response) => {
    db.find({}, '-_id', (err,result) => {
        if(err){
            console.log('Error occured in backend');
            return err
        }else{
            console.log('Data sent');
            response.json(result);
        }
    });
});

app.listen(PORT, ()=> {
    console.log('Server started at port', PORT)
})