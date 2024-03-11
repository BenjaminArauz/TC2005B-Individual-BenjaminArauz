const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './Lab13/views');

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const rutasHome = require('./routes/productos.routes.js');
const rutasFeedback = require('./routes/feedback.routes.js');
const rutasResenia = require('./routes/resenia.routes.js');

app.use('/', rutasHome);
app.use('/feedback', rutasFeedback);
app.use('/resenia', rutasResenia);

app.use((request, response, next) => {
  response.status(404);
  response.sendFile(path.join(__dirname, 'views', '404.html')); //Manda la respuesta
});

app.listen(3000);