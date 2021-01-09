require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(()=>{
    console.log('DB CONNECTED');
}).catch(()=>{
    console.log('Oops!!!!');
});



app.get('/',(req,res)=>{
  res.send('Hello')
});

//Routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);

//Port
app.listen(process.env.PORT || 3000, () => {
  console.log("Running");
});
