
module.exports = function verificar2(palabra, separador){
    var expresionRegular = /\s* \s*/;
    
//    document.writeln(numeroPalabras.length);

    var numeroPalabras = palabra.split(" ");
    
    for(var i = 0; i<numeroPalabras.length; i++){
        //mini es cada palabra del texto
        var validarPalabra = 1;
        var validarEntero = 1;
        var validarDecimal = 0;
        var validarOperador = 0;
        var validarAgrupacion = 0;
        var validarSigno = 0;
        var validarReservada = 0;
        var validarVariable = 0;
        var validarBoolean = 0;
        var validarError = 1;
        var mini = numeroPalabras[i].split(separador);
        var validarNumero = 0;            
    if(/^[a-z][a-z]*/.test(mini[0]) == true && mini.length > 1){
        for(a=1; a<mini.length; a++){
            if(/^[a-z][a-z]*/.test(mini[a]) == false){
                if(/^([0-9])*$/.test(mini[a]) == false){
                    validarEntero = 0;
                    validarPalabra = 0;
                } 
            } 
        }    
    } else if(/^[+-]?([0-9]+([.][0-9]*)|[.][0-9]+)$/.test(numeroPalabras[i])){
        validarDecimal = 1;
        validarPalabra = 0;
        validarEntero = 0;
        validarError = 0;
    } else if(/^([0-9])*$/.test(numeroPalabras[i])){
        validarPalabra = 0;
        validarEntero = 1;
        validarError = 0;          
    } else if(/^([{()}])*$/.test(numeroPalabras[i])){
        validarAgrupacion = 1;
        validarPalabra = 0;
        validarError = 0;
        validarEntero = 0;
    } else if(/^([";])*$/.test(numeroPalabras[i])){
        validarSigno = 1;
        validarPalabra = 0;
        validarError = 0;
        validarEntero = 0;                
    }  else{
        validarPalabra = 0;
    }           
        switch(numeroPalabras[i]){
            case '+':
                validarOperador = 1;
                validarError = 0;
                validarPalabra = 0;
                validarEntero = 0;
                break;
            case '-':
                validarOperador = 1;
                validarError = 0;
                validarPalabra = 0;
                validarEntero = 0;
                break;
            case '*':
                validarOperador = 1; 
                validarError = 0; 
                validarPalabra = 0;  
                validarEntero = 0;           
                break;
            case '/':
                validarOperador = 1; 
                validarError = 0; 
                validarEntero = 0;
                validarPalabra = 0;              
                break;        
            case '%':
                validarOperador = 1;  
                validarError = 0;  
                validarPalabra = 0;              
                validarEntero = 0;  
                break;    
            case '=':
                validarOperador = 1;
                validarError = 0; 
                validarPalabra = 0;
                validarEntero = 0;   
                break;
            case '<':
                validarOperador = 1; 
                validarError = 0;   
                validarPalabra = 0;
                validarEntero = 0;
                break;   
            case '>':
                validarOperador = 1;
                validarError = 0;  
                validarPalabra = 0;
                validarEntero = 0;  
                break; 
            case '>=':
                validarOperador = 1;
                validarError = 0;
                validarPalabra = 0;
                validarEntero = 0;
                break;
            case '<=':
                validarOperador = 1;
                validarError = 0;
                validarPalabra = 0;
                validarEntero = 0;
                break;   
            case '(':
                validarAgrupacion = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case ')':
                validarAgrupacion = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case '{':
                validarAgrupacion = 1;
                validarPalabra = 0;
                validarEntero = 0;
                validarError = 0;
                break;
            case '}':
                validarAgrupacion = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case '"':
                validarSigno = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case ';':
                validarSigno = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case 'variable':
                validarVariable = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case 'entero':
                validarVariable = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case 'decimal':
                validarVariable = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case 'booleano':
                validarVariable = 1;
                verificadorPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case 'cadena':
                validarVariable = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case 'si':
                validarVariable = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case 'sino':
                validarVariable = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case 'mientras':
                validarVariable = 1;
                validarPalabra = 0;
                validarEntero = 0;
                validarError = 0;
                break;
            case 'hacer':
                validarVariable = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case 'VERDADERO':
                validarBoolean = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;
            case 'FALSO':
                validarBoolean = 1;
                validarPalabra = 0;
                validarError = 0;
                validarEntero = 0;
                break;   
             case '++':
                validarOperador = 1;
                validarError = 0;
                validarPalabra = 0;
                validarEntero = 0;
                break;  
        }
    
        if(validarOperador == 1){
            console.log('operador');
        } else if(validarPalabra == 1){
            console.log('palabra');
        } else if(validarAgrupacion == 1){
            console.log('agrupacion');
        } else if(validarSigno == 1){
            console.log('signo');
        } else if(validarReservada == 1){
            console.log('palabra reservada');
        } else if(validarVariable == 1){
            console.log('variable');
        } else if(validarBoolean == 1){
            console.log('boolean');
        } else if(validarNumero == 1){
            console.log('numero');
        }else if(validarError == 1){
            console.log('error');
        } else if(validarEntero == 1){
            console.log('entero');
        } else if(validarDecimal == 1){
            console.log('flotante');
        }

    }



}

