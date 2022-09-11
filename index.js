const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')

const routes = require('./routes/handlers');

app.use(express.static('public'));
app.use(bodyParser.urlencoded())

const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/mainLayout'), // change layout folder name
});

// Express Handlebars Configuration
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configure Routes
app.use('/', routes);

app.listen(3001, async () => {
    console.log('Server is starting at port ', 3001);
});