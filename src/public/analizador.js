//funcion que lee el archivo .txt
function leerArchivo(e){
    var archivo = e.target.files[0];
    if(!archivo){
        return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        mostrarContenido(contenido);
    };
    lector.readAsText(archivo);
}

//funcion que muestra el contenido del archivo dentro de un textarea
function mostrarContenido(contenido){
    var elemento = document.getElementById('bbb');
    elemento.innerHTML = contenido;
}

document.getElementById('files').addEventListener('change', leerArchivo, false);