import app from './index.js';


let port = process.env.PORT || 8080
app.listen(port, () =>{
    console.log("Server is running on port " + port);
})