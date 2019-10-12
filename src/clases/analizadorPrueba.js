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
    var palabra = text.split(/\s+\n*/);
    
    if (caracterDePalabra != 0) {
        palabraAnalizar = palabra[numeroDePalabra].substr(caracterDePalabra);
        estado = 3;
    } else {
        var palabraAnalizar = palabra[numeroDePalabra];
    }

    numeroDePalabra++;
    var estado;

    for(i = 0; i < palabraAnalizar.length; i++){
        var caracter = palabraAnalizar[i];
        if(i == 0){
            estado = 0;
        }
        if (expresionNumero.test(caracter)) {
            estado = matriz[estado][1];
        } else if (comparacionSimbolos(caracter)) {
            console.log("i "+i);
            var aux = estado;
            estado = matriz[estado][2];
            if (i == 0 && i < palabraAnalizar.length - 1) {
                numeroDePalabra--;
                console.log('si1');
                if (comparacionSimbolos(palabraAnalizar.substr(i+1,i+1))) {
                    
                    if(i==palabraAnalizar.length - 2){
                        numeroDePalabra++;
                        caracterDePalabra=0;
                    }else{
                        caracterDePalabra=i+2;
                    }
                    palabraAnalizar = caracter + "" + palabraAnalizar[i + 1];
                    return finalizarPalabra(palabraAnalizar, estado);
                } else {
                    caracterDePalabra = caracterDePalabra+1;
                    console.log(palabraAnalizar.charAt(0)+"sub");
                    return finalizarPalabra(palabraAnalizar.charAt(0), estado);
                }


            } else if (i == 0) {
                caracterDePalabra=0;
                return finalizarPalabra(palabraAnalizar, estado);
            } else {
                numeroDePalabra--;
                caracterDePalabra = i;
                console.log(aux);
                
                return finalizarPalabra(palabraAnalizar.substr(0, i), aux);
            }                
        } else if(caracter == "."){
            estado = matriz[estado][3];
        } else if (expresionLetra.test(caracter) == true) {
            estado = matriz[estado][0];
        }  else {
            estado = 0;
        }

        if(estado == 0){
            return "Error";
        }
        if (i === palabraAnalizar.length - 1) {
            caracterDePalabra = 0;
            return finalizarPalabra(palabraAnalizar, estado);

        }
    }
    return estado;
}

function finalizarPalabra(palabraAnalizar, estado) {
    if (estado == 4) {
        return "Identificador";
    } else if (estado == 5) {
        return "Error";
    } else if (estado == 6) {
        return "Flotante"
    } else {
        return regresar(palabraAnalizar, estado);

    }
}

function regresar(palabra, estado) {

    switch (estado) {
        case 1:

            for (k = 0; k < palabrasReservadas.length; k++) {
                if (palabrasReservadas[k] == palabra) {
                    return "El token es una palabra reservada          "+palabra;

                }
            }
            if (palabrasBoolean[1] == palabra || palabrasBoolean[0] == palabra) {
                return "El token es un Boolean";
            } else {
                return "Identificador";
            }
        case 2:
            return "El token es un Numero";
        case 3:
            
            for (k = 0; k < operador.length; k++) {
                if (operador[k] == palabra) {
                    return "El token es un Simbolo de Operador";
                }
            }
            for (k = 0; k < agrupacion.length; k++) {
                if (agrupacion[k] == palabra) {
                    return "El token es un Simbolo de Agrupacion";
                }
            }
            for (k = 0; k < signos.length; k++) {
                if (signos[k] == palabra) {
                    return "El token es un Signo";
                }
            }
    }


}

function comparacionSimbolos(texto) {
    for (j = 0; j < simbolos.length; j++) {
        if (simbolos[j] == texto) {
            return true;
        }
    }
    return false;
}
