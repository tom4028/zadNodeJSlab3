const fs = require('fs');




let lastName = (cb)=>{
    fs.readFile('person.json',(err,data)=>{
    if(!err && data){
        let person = JSON.parse(data);
        //console.log(person.lastName);
        cb(null,person.lastName);
    }else{
        cb(err,null);
    }
})
}


lastName(function(err,name){
    if(!err){
        console.log(name);
    }else{
        console.log("Error: "+err);
    }
})