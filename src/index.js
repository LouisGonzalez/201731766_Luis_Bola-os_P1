const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


//settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', 3003);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//listening
app.listen(app.get('port'), () =>{
    console.log('server on port', app.get("port"));
});

