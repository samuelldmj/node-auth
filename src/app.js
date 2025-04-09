const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

const express = require('express');
const mongoose = require('mongoose');
const { userRoutes } = require('./routes/userRoutes');
const morgan = require('morgan');
const path = require('path');
const { requireAuth } = require('./middleware/authMiddleware');
const { checkUserMiddleware } = require('./middleware/checkUserMiddleware');

const app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

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
// Apply checkUserMiddleware to all routes (modified)
app.use(checkUserMiddleware);

// Regular routes
app.get('/', (req, res) => res.render('home'));
app.use(userRoutes);

// Protected routes
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));




require("./model/users.model");