/* 
==========================================
 Title: Express Server
 Author and Co-Authors: Jayakrithi Shivakumar, Faiyaz Rahman  
 Last updated: 10 Oct 2021 12:07AM
==========================================
*/

// Loads required packages 
/* To run the server use nodemon */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jobsRouter = require('./routes/jobs')
const usersRouter = require('./routes/users')
require('dotenv').config({ path: 'backend/.env'});

// Connecting to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully")
})

const app = express();
const port = process.env.PORT || 3200;

// Start the Server
app.use(cors());
app.get('*', (req, res) => {
    const resolve = path.resolve(__dirname, "client", "build", "index.html");
    console.log(`server#:43`, resolve);
    res.sendFile(resolve)
})
app.use(express.json());

//app.use('/auth', require("./routes/auth"));
app.use('/users', usersRouter);
app.use('/jobs/add', jobsRouter);
app.use('/jobs', jobsRouter);
app.use('/', jobsRouter);
app.use('/:jobID', jobsRouter);

app.use(express.static('client/build'))

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});