const express = require('express');
const router = express.Router();
router.use(express.json());
const path = require('path');
var validacion = "";
const verificador = require('./verificacion');
const ver = require('../clases/analizadorLexico');
const ver2 = require('../clases/analizadorPrueba');
var hola = "hola";
var adios = "adios";

router.get("/", (req, res) => {
    res.render('index', {title: 'first website'});
});

router.post('/postusers', (req, res) => {
    //console.log('recibo usuario');
    //console.log(req.body.firstName);

    //console.log(req.body.lastName);
    //console.log(req.body.text);
    
    
    
    /*importante
    hola = ver(req.body.text);    
    console.log(hola);*/

    hola = ver2(req.body.text);
    console.log(hola);

    res.status(200).send('wrong');
});





router.get('/users', (req, res) => {
    console.log('envio usuario');

    setTimeout(() => {
        res.status(200).json({

            usurio: 'luis',

            id: hola,

            carne: '202'
    });
}, 35);
});


router.get('/contact', (req, res) => {
    res.render('contact', {title: 'contact'}); 
});

router.get('/diagrama', (req, res) => {
    res.render('diagrama', {title: 'contact'});    
})



module.exports = router;