const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const { router } = require('./routes/authRoutes');
const morgan = require('morgan'); 
const path = require('path');

const app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(morgan('dev'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



mongoose.connect(process.env.MONGO_DB_CONNECTION)
    .then(() => {
        // Connection successful
        console.log('Db Connected!!');
        
        // Server configuration
        const port = 8000;
        const host = "localhost";
        
        // Start the Express server
        app.listen(port, () => {
            console.log(`This server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        // Connection failed
        console.log(`Db Connection error: ${err.message}`);
    });


// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(router);

require("./model/users.model");