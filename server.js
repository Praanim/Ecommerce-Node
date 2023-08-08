const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT= 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


const mongoDbPath= "mongodb+srv://pranimsingh7:pranim2580@cluster0.scwvxin.mongodb.net/ecommerce?retryWrites=true&w=majority";
mongoose.connect(mongoDbPath).then(
    function(){
        app.get('/',function(req,res){
            res.send("This is home page");
        });
        
    }
);



app.listen(PORT,function(){
    console.log(`Server Started at PORT: ${PORT}`);
})