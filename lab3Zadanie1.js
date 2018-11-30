const fs = require('fs');
const yargs = require('yargs').argv;

const person = {
    name:'',
    lastName:''
};

person.name = yargs.name;
person.lastName = yargs.lastname;

fs.writeFile('person.json',JSON.stringify(person),(err)=>{
    if(!err){
        console.log('Dane zapisane');
    }else{
        console.log("Error: "+err);
    }
});

console.log(person);