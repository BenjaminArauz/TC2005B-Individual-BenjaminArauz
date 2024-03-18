const express = require('express');
const app = express();

app.set('view engine', 'ejs');
//('views', './Laboratorio12/views') el apartado de la izquierda es una palabra reservada de express y el de la derecha es la carpeta donde se encuentran los archivos
app.set('views', 'views');

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
//Middleware
app.use((request, response, next) => {
  console.log('Middleware!');
  next(); //Le permite a la petición avanzar hacia el siguiente middleware
});
const rutasHome = require('./routes/home.routes.js');
const rutasFeedback = require('./routes/feedback.routes.js');

app.use('/', rutasHome);
app.use('/feedback', rutasFeedback);

app.use((request, response, next) => {
  response.status(404);
  response.sendFile(path.join(__dirname, 'views', '404.html')); //Manda la respuesta
});

app.listen(3000);