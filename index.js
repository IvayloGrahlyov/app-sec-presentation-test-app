require("dotenv").config();
const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

const routes = require('./routes/handlers');

app.use(express.static('public'));
app.use(bodyParser.urlencoded())

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/mainLayout'), 
});

// Express Handlebars Configuration
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configure Routes
app.use('/', routes);

app.listen(PORT, async () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});