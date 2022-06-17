const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const webFileServing = require('./middlewares/frontendServer');

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', webFileServing);

app.listen(process.env.PORT || 3000, (err) => {
	if (err) console.log('Error loading the server');
	else console.log('Server has been started');
});
