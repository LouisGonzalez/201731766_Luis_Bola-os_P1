const getButton = document.querySelector('#recibidor');
const postButton = document.querySelector('#posteador');
const getText = document.querySelector('#bbb');
const actual = document.querySelector('#actual');

const url = "http://localhost:3003/users";

const getData = () => {
    axios.get(url).then(response => {
        console.log(response.data);
        actual.innerHTML = actual.innerHTML + '<tr>' + '<td>' + response.data.id + '</td>' + '</tr>'
        console.log({ actual });
    })
    .catch(error => {
        console.log(error);
    });
};


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



postButton.addEventListener('click', sendData);


getButton.addEventListener('click', getData);



