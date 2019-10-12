//variables de la pagina inicial
const getButton = document.querySelector('#recibidor');
const postButton = document.querySelector('#posteador');
const getText = document.querySelector('#bbb');
const actual = document.querySelector('#actual');

const url = "http://localhost:3003/users";

//controlador axios para mostrar en pantalla el token ya previamente analizado
const getData = () => {
    axios.get(url).then(response => {
        console.log(response.data);
        actual.innerHTML = actual.innerHTML + '<tr>' + '<td>' + response.data.tip + '</td>' + '<td>' + response.data.descripcion + '</td>' + '<td>' + response.data.num + '</td>' +  '</tr>'
        console.log({ actual });
    })
    .catch(error => {
        console.log(error);
    });
};

//controlador axios para agarrar el texto del frontend y llevarlo al backend para ser operado
const sendData = () =>{
    axios.post('http://localhost:3003/postusers', {
        firstName: 'Luis',
        lastName: 'Gonzalez',
        text: getText.value
    
    },{
        'Content-Type': 'application/json'
    })
    .then(response => {

        console.log(response);

    })

    .catch(error => {

        console.log(error);

    });

};


//accion del boton enviar datos
postButton.addEventListener('click', sendData);

//accion del boton obtener informacion
getButton.addEventListener('click', getData);



