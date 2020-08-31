require('dotenv').config()
const express = require('express');
const cors = require('cors');

// database connection
const db = require('./config/db');
// test db
db.authenticate()
    .then(()=>console.log('DB connected...'))
    .catch(err=>console.log('error ', err))


// start express
const app = express();
app.use(express.json());
app.use(cors());

// index route
app.get('/', (req, res) => res.send('Index route'));

// users routes
app.use('/users', require('./routes/users'));

// app.get('/authentication/add-user/', cors(), async (req, res) => {
//     res.status(200).json({ status: true, message: "Successfully created new user" })
// })


// listening here
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`REST API listening on port ${PORT}`));