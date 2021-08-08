'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const storage_routes = require('./routes/storageZones_routes');
const pull_zone = require('./routes/pull_zones');
const uploadfile = require('./routes/uploadFile');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json({limit :"30mb",extended :true}));
app.use(bodyParser.urlencoded({limit :"30mb",extended :true}));
app.use(cors());

app.get('/',(req,res) =>{
    res.send("Hello to Backend server");
});

// Bunny CDN rules
app.use('/storage',storage_routes);
app.use('/pullzone',pull_zone);
app.use('/upload',uploadfile);

const PORT = process.env.PORT || 3000;

const mongoose_option ={
    useCreateIndex: true,
    useNewUrlParser :true,
    useUnifiedTopology:true
}

const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose.connect(CONNECTION_URL,mongoose_option)
    .then(()=>{
        console.log("Connection to mongodb is successful");
    })
    .catch((error)=>{
        console.log("The error occured in Monogodb connection ",error)
    })

mongoose.set('useFindAndModify',false);

const server = app.listen(PORT, () => console.log("App is listening on url http://localhost:" + PORT))