var fs = require("fs");
const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();


app.set("views",path.join(__dirname,"views"))


var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cd(null,"uploads")
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname + "-" + Date.now()+".jpg")
  }
})


const maxSize = 1*1000*1000;

var upload =  multer({
  storage:storage,
  limits:{fileSize:maxSize},
  fileFilter:function(req,file,cb){
    var filetypes=/jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if(mimetype && extname){
      return cb(null,true);
    }

    cb("Error: File upload only supports the "+"following filetypes ="+filetypes);
  }
}).single("mypic");
app.get("/",function(req,res){
  res.render("signup");
})

app.post("uploadProfilePicture",function(req,res,next){
  upload(req,res,function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send("Success,Image uploaded!");
    }
  })
})

app.listen(8080,function(error){
  if(error) throw error 
  console.log("Server created Successfully on port 8080");
})

// Asynchronous read
fs.readFile('input.txt', function (err, data) {
if (err) {
	return console.error(err);
}
console.log("Asynchronous read: " + data.toString());
});


console.log('Opening file!');
fs.open('input.txt','r+',function(err,fd){
  if(err){
    return console.error(err);
  }
  console.log('File opened successfully');
});

console.log("Writing into existing file");
fs.writeFile('input.txt','Hii',function(err){
  if(err){
    return console.error(err);
  }

  console.log("Data written successfully!");
  console.log('Lets read newly written data');

  fs.readFile('input.txt',function (err,data){
    if(err){
      return console.error(err);
    }
    console.log("Asynchronous read: "+data.toString());
  });
});

var data = "\nLearn Node.js";

fs.appendFileSync('input.txt',data,'utf8',function(err){
  if(err) throw err;
  console.log("Data is appended to file successfully.")
})

// fs.unlink('delete.txt',function(err){
//   if(err){
//     return console.error(err);
//   }
//   console.log("File deleted successfully!");
// })





// fs.readFile('input.txt',function(err,data){
// if(err){
//   return console.error(err);
// }
// console.log('Asynchronous read: '+data.toString());
// });