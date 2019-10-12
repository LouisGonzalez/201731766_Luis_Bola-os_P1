const express = require('express');
const router = express.Router();
router.use(express.json());
const path = require('path');
var validacion = "";
const ver = require('../clases/analizadorLexico');
const ver2 = require('../clases/analizadorPrueba');
var hola = "hola";
var adios = "adios";
var tipo, estado, numero;

//ruta que obtiene de la pagina principal
router.get("/", (req, res) => {
    res.render('index', {title: 'first website'});
});

//ruta que define variables para obtener informacion
router.post('/postusers', (req, res) => {
    hola = ver2(req.body.text);
    console.log(hola);
    tipo = hola[0];
    palabra = hola[1];
    numero = hola[2];   
    res.status(200).send('wrong');
});

//definicion de variables para ser usadas en el metodo axios
router.get('/users', (req, res) => {
    console.log('envio usuario');

    setTimeout(() => {
        res.status(200).json({

            usurio: 'luis',

            id: hola,

            tip: tipo,
            
            descripcion: palabra,
            
            num: numero,

            carne: '202'
    });
}, 35);
});

//ruta de la pagina de informacion del estudiante
router.get('/contact', (req, res) => {
    res.render('contact', {title: 'contact'}); 
});

//ruta de la pagina de diagrama de moore
router.get('/diagrama', (req, res) => {
    res.render('diagrama', {title: 'contact'});    
})



module.exports = router;