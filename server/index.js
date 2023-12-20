require('dotenv/config')
const express = require('express');
const app = express();
const port = process.env.PORT || 5750;
const connect = require('./config/db');
const morgan = require('morgan');
const cors = require('cors')
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
 

// custom middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

// Api's
app.use('/api/products',productRoute);
app.use('/api/user',userRoute);
app.use('/api',orderRoute);

// server and DB
connect()
.then(()=>{
    try {
        app.listen(port,(req,res)=>{
            console.log(`server is connected to http://localhost:${port}`);
        })

        
    } catch (error) {
        console.log('can not connect to the server');
        
    }
})
.catch((error)=>{
    console.log("invalid database connection...!" , error);
})



// routes
app.get('/',(req,res)=>{
    res.status(200).json({message:'app is running'})
})


app.use((req,res)=>{
    res.status(404).json({message:'that route doesnt exist'})
})

