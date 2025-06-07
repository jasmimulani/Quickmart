import express from 'express';

const app = express();
const port = process.env.PORT || 7000;


app.get('/',(req,res) =>
    res.send("api is working"))


app.listen(port,() =>{
    console.log(`server is running on http://localhost:${port}`);
    
})