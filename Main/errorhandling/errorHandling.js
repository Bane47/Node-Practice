const express = require('express');
const app = express();

// app.use(function(err,req,res,next){
//     console.error(err.stack);
//     res.status(500).send('Something Broke!');
// });

// app.get('/',function(req,res,next){
//     var err = new Error("Something went wrong");
//     next(err);
// });

app.use(function(err,req,res,next){
    res.status(500);
    res.send("404 Oops,something went wrong");

});

app.listen(3000,function(){
    console.log("Server is running")
})