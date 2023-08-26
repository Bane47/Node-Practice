const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const app = express();
const axios = require('axios');

dotenv.config();

let PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is up and running on ${PORT}`);
})

app.post("/user/generateToken",(req,res)=>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time:Date(),
        userId:12,
        name:"This is karthi here"
    }

    const token = jwt.sign(data,jwtSecretKey);
    res.send(token);
})

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IEF1ZyAyNCAyMDIzIDE2OjM4OjEzIEdNVC0wNzAwIChQYWNpZmljIERheWxpZ2h0IFRpbWUpIiwidXNlcklkIjoxMiwibmFtZSI6IlRoaXMgaXMga2FydGhpIGhlcmUiLCJpYXQiOjE2OTI5MjAyOTN9.7iUFwpal1FlgIVJraxzYZVRRwhdtpsGIcE8VOvuiVx8";

// const config ={
//     headers:{
//         'Authorization':`Bearer ${token}`
//     }
// };
// axios.get("http://localhost:5000/user/validateToken",config)
//     .then((response)=>{
//       console.log(response.data[0]);
//     })
app.get("/user/validateToken",(req,res)=>{
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try{
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token,jwtSecretKey);
        if(verified){
            return res.send("Successfully verified");
        }else{
            return res.status(401).send(error);
        }
    }catch(error){
        return res.status(401).send(error);
    }
});