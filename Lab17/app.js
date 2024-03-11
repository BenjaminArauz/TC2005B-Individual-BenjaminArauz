const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './Lab17/views');

const session = require('express-session');
app.use(session({
  secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());


const rutasHome = require('./routes/productos.routes.js');
const rutasFeedback = require('./routes/feedback.routes.js');
const rutasResenia = require('./routes/resenia.routes.js');
const rutasUsuarios = require('./routes/usuario.routes.js');

app.use('/', rutasHome);
app.use('/feedback', rutasFeedback);
app.use('/resenia', rutasResenia);
app.use('/usuarios', rutasUsuarios);

app.use((request, response, next) => {
  response.status(404);
  response.sendFile(path.join(__dirname, 'views', '404.html')); //Manda la respuesta
});

app.listen(3000);