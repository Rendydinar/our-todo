const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');	
const cors = require('cors');
const cookieParser = require('cookie-parser');
// use variabels defined in local
require('dotenv').config();
// const flash = require('connect-flash');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 8000;
const APILimiter = require('./middleware/Limiter');

// initial express app
const app = express();

// DB config
const db = require('./config/db-config').MongoURI;

// Connect ot MongoDB 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
   		console.log('MongoDB Connected');   		
   		// Routes
		app.use(require('./routes/our-todo'));
   })
   .catch(err => console.log(err));

// Set Public Folder
app.use('/public', express.static(path.join(__dirname, '/public')));
	
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Template Engine
app.set('view engine', 'ejs');

// Set DDOS Protection
app.use(APILimiter);

// XSS Protection
app.use(helmet());

// CORS Protection 
app.use(cors());

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));