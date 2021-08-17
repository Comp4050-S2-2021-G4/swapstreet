// Loads required packages 
/* To run the server use nodemon */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jobsRouter = require('./routes/jobs')
require('dotenv').config();

// Connecting to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully")
})

const app = express();
const port = process.env.PORT || 5000;

// Start the Server
app.use(cors());
app.use(express.json());
// newly added
app.use('/api/auth', require("./routes/auth"));
//app.use('/jobs', jobsRouter);

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});