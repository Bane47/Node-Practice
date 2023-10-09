const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

MongoClient.connect(url,function(err,db){
    if(err){
        throw err;
    } 
    var myDb = db.db('MyFirstDB');
    var mydata = {message:'Hello-world'};
 
    myDb.collection('webusers').insertOne(mydata,function(err,res){
        if(err) throw err;
        console.log("Document inserted");
        db.close();
    })
})
