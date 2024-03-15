const express= require('express');
const app= express();
const cors= require("cors");
const mongoose=require('mongoose');
const {notFound, errorHandler}= require('./middlewares/ErrorHandler');
const recipeRoutes= require('./routes/recipes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/recipes',recipeRoutes);

app.use(notFound);
app.use(errorHandler);

main().catch(err => console.log(err))
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/cheff_connect_database');
  console.log("connected");
}

//server
app.listen(9090,()=>{
    console.log("APP IS LISTENING ON PORT 9090");
})