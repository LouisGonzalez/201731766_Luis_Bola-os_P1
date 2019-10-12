//matriz de la tabla de transiciones
const matriz = [
    [1, 2, 3, 0],
    [1, 4, 0, 0],
    [0, 2, 0, 5],
    [0, 0, 3, 0],
    [4, 4, 0, 0],
    [0, 6, 0, 0],
    [0, 6, 0, 0]];

const expresionLetra = /^[a-z]|^[A-Z]*/
const expresionNumero = /^([0-9])*$/
const simbolos = ['+', '-', '*', '/', '%', '=', '>', '<', '(', ')', '{', '}', '"', ';'];
const palabrasReservadas = ["variable", "entero", "mientras", "hacer", "si", "sino", "decimal", "boolean", "cadena"];
const palabrasBoolean = ["VERDADERO", "FALSO"];
const operador = ['+', '-', '*', '/', '%', '=', '>', '<', '>=', '<=', '=='];
const agrupacion = ['(', ')', '{', '}'];
var retorno = new Array();
const signos = ['"', ';'];
var numeroDePalabra = 0;
var caracterDePalabra = 0;

module.exports = function leer(text){
    //separa todo el texto palabra por palabra
    var palabra = text.split(/\s+\n*/);    
    if (caracterDePalabra != 0) {
        palabraAnalizar = palabra[numeroDePalabra].substr(caracterDePalabra);
        estado = 3;
    } else {
        //detecta la palabra con la que se trabaja en especifico
        var palabraAnalizar = palabra[numeroDePalabra];
    }
    //variable que aumenta con respecto a los clicks en los botones
    numeroDePalabra++;
    var estado;
    //ciclo que analiza la palabra letra por letra
    for(i = 0; i < palabraAnalizar.length; i++){
        //variable definida para que tome caracter por caracter
        var caracter = palabraAnalizar[i];
        //si i es 0 darle al estado inicial un valor de 0
        if(i == 0){
            estado = 0;
        }
        //si el caracter en la posicion i es igual a un numero entonces...
        if (expresionNumero.test(caracter)) {
            estado = matriz[estado][1];
        //si el caracter en la posicion i es igual a un caracter entonces...    
        } else if (comparacionSimbolos(caracter)) {
            console.log("i "+i);
            var aux = estado;
            estado = matriz[estado][2];
            //metodo que detecta si nuestra palabra es mayor a una letra
            if (i == 0 && i < palabraAnalizar.length - 1) {
                numeroDePalabra--;
                console.log('si1');
                //metodo que detecta si la letra despues a la primera es un simbolo
                if (comparacionSimbolos(palabraAnalizar.substr(i+1,i+1))) {
                    if(i==palabraAnalizar.length - 2){
                        numeroDePalabra++;
                        caracterDePalabra=0;
                    }else{
                        caracterDePalabra=i+2;
                    }
                    //reescribe la palabra
                    palabraAnalizar = caracter + "" + palabraAnalizar[i + 1];
                    //retorna un valor
                    return finalizarPalabra(palabraAnalizar, estado, numeroDePalabra);
                } else {
                    caracterDePalabra = caracterDePalabra+1;
                    console.log(palabraAnalizar.charAt(0)+"sub");
                    return finalizarPalabra(palabraAnalizar.charAt(0), estado, numeroDePalabra);
                }

            //si al final del recorrido i es 0 entonces    
            } else if (i == 0) {
                caracterDePalabra=0;
                return finalizarPalabra(palabraAnalizar, estado, numeroDePalabra);
            } else {
                numeroDePalabra--;
                caracterDePalabra = i;
                console.log(aux);
                
                return finalizarPalabra(palabraAnalizar.substr(0, i), aux, numeroDePalabra);
            }   
        //si el caracter es un punto marcarlo como un estado pre-definido                 
        } else if(caracter == "."){
            estado = matriz[estado][3];
        } else if (expresionLetra.test(caracter) == true) {
            estado = matriz[estado][0];
        }  else {
            estado = 0;
        }
        //si al final de todo el recorrido estado es 0 marcarlo como error
        if(estado == 0){
            return ['Error', palabraAnalizar, numeroDePalabra];
        }
        if (i === palabraAnalizar.length - 1) {
            caracterDePalabra = 0;
            return finalizarPalabra(palabraAnalizar, estado, numeroDePalabra);
        }
    }
    
}

function finalizarPalabra(palabraAnalizar, estado, numeroDePalabra) {
    //si estado es 4 se marca como identificador
    if (estado == 4) {
        return ['Identificador', palabraAnalizar, numeroDePalabra];
    //si estado es 5 se marca como error    
    } else if (estado == 5) {
        return ["Error", palabraAnalizar, numeroDePalabra];
    //si estado es 6 se marca como flotante    
    } else if (estado == 6) {
        return ['Flotante', palabraAnalizar, numeroDePalabra];
    } else {
        return regresar(palabraAnalizar, estado, numeroDePalabra);

    }
}

function regresar(palabra, estado, numeroDePalabra) {
    switch (estado) {
        //si estado es 1 detectar si es igual a alguna palabra reservada
        case 1:
            for (k = 0; k < palabrasReservadas.length; k++) {
                if (palabrasReservadas[k] == palabra) {
                    return ['Reservada', palabra, numeroDePalabra];
                }
            }
            if (palabrasBoolean[1] == palabra || palabrasBoolean[0] == palabra) {
                return ['Booleano', palabra, numeroDePalabra];
            } else {
                return ['Identificador', palabra, numeroDePalabra];
            }
        //si estado es 2 se marca como numero    
        case 2:
                return ['Numero', palabra, numeroDePalabra];
        //si estado es 3 detecta a que familia de simbolos pertenece    
        case 3:            
            for (k = 0; k < operador.length; k++) {
                if (operador[k] == palabra) {
                    return ['Simbolo de operador', palabra, numeroDePalabra];
                }
            }
            for (k = 0; k < agrupacion.length; k++) {
                if (agrupacion[k] == palabra) {
                    return ['Simbolo de agrupacion', palabra, numeroDePalabra];
                }
            }
            for (k = 0; k < signos.length; k++) {
                if (signos[k] == palabra) {
                    return ['Signo', palabra, numeroDePalabra];
                }
            }
    }
}

//funcion para comparar si es igual a algun simbolo
function comparacionSimbolos(texto) {
    for (j = 0; j < simbolos.length; j++) {
        if (simbolos[j] == texto) {
            return true;
        }
    }
    return false;
}
