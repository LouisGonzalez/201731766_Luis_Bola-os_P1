const matriz = [
    [1, 2, 3, 0],
    [1, 4, 0, 0],
    [0, 2, 0, 5],
    [0, 0, 3, 0],
    [4, 4, 0, 0],
    [0, 6, 0, 0],
    [0, 6, 0, 0]];

const expresionLetra = /^[a-z]|^[A-Z]*/
const expresionNumero = /^[0-9]*$/
const simbolos = ['+', '-', '*', '/', '%', '=', '>', '<', '(', ')', '{', '}', '"', ';'];
const palabrasReservadas = ["variable", "entero", "mientras", "hacer", "si", "sino", "decimal", "boolean", "cadena"];
const palabrasBoolean = ["VERDADERO", "FALSO"];
const operador = ['+', '-', '*', '/', '%', '=', '>', '<', '>=', '<=', '=='];
const agrupacion = ['(', ')', '{', '}'];
const signos = ['"', ';'];
var numeroDePalabra = 0;
var caracterDePalabra = 0;

module.exports = function leer(text) {
    //palabra es cada palabra del texto
    var palabra = text.split(/\s+\n*/);
    if (caracterDePalabra != 0) {
        palabraAAnalizar = palabra[numeroDePalabra].substr(caracterDePalabra);
        estado = 3;
    } else {
        var palabraAAnalizar = palabra[numeroDePalabra];
    }

    numeroDePalabra++;
    var estado;
    for (i = 0; i < palabraAAnalizar.length; i++) {
        var caracter = palabraAAnalizar[i];
        if (i == 0) {
            estado = 0;
        }
        console.log("i "+i);
        if (expresionLetra.test(caracter) == true) {
            estado = matriz[estado][0];

        } else if (expresionNumero.test(caracter)) {
            estado = matriz[estado][1];

        } else if (comparacionSimbolos(caracter)) {
            console.log("i "+i);
            var aux = estado;
            estado = matriz[estado][2];
            if (i == 0 && i < palabraAAnalizar.length - 1) {
                numeroDePalabra--;
                console.log('si1');
                if (comparacionSimbolos(palabraAAnalizar.substr(i+1,i+1))) {                    
                    if(i==palabraAAnalizar.length - 2){
                        numeroDePalabra++;
                        caracterDePalabra=0;
                    } else {
                        caracterDePalabra=i+2;
                    }
                    palabraAAnalizar = caracter + "" + palabraAAnalizar[i + 1];
                    return finalizarPalabra(palabraAAnalizar, estado);
                } else {
                    caracterDePalabra = caracterDePalabra+1;
                    console.log(palabraAAnalizar.charAt(0)+"sub");
                    return finalizarPalabra(palabraAAnalizar.charAt(0),estado);
                }
            } else if (i == 0) {
                caracterDePalabra=0;
                return finalizarPalabra(palabraAAnalizar, aux);
            } else {
                numeroDePalabra--;
                caracterDePalabra = i;
                console.log(aux);
                
                return finalizarPalabra(palabraAAnalizar.substr(0, i), aux);
            }

        } else if (caracter == ".") {
            estado = matriz[estado][3];
        } else {
            estado = 0;
        }
        //Simbolo

        if (estado == 0) {
            return "Error"
            break;
        }
        if (i === palabraAAnalizar.length - 1) {
            caracterDePalabra = 0;
            return finalizarPalabra(palabraAAnalizar, estado);

        }
    }
}

function finalizarPalabra(palabraAAnalizar, estado) {
    if (estado == 4) {
        return "Identificador";
    } else if (estado == 5) {
        return "Error";
    } else if (estado == 6) {
        return "Flotante"
    } else {
        return regresar(palabraAAnalizar, estado);

    }
}

function regresar(palabra, estado) {

    switch (estado) {
        case 1:

            for (k = 0; k < palabrasReservadas.length; k++) {
                if (palabrasReservadas[k] == palabra) {
                    return "El token es una Palabra Reservada";
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
