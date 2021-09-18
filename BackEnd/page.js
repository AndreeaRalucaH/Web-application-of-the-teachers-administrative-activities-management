const fetchProfi = () => {
    axios.post('http://localhost:8080/atasamente')
       .then(response => {
           const profi = response.data;
           console.log('GET list of teachers', profi);
       })
       .catch(error => console.error(error));
};

let buton = document.getElementById('myFile');

buton.addEventListener("click", ()=>{
    console.log("Works")
    fetchProfi();
})