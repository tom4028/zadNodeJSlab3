const yargs = require('yargs').argv;
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    prompt:">"
});

let options = {
    method:'GET',
    headers:{
        'Content_type':'text/html'
    },
    uri:`https://jsonplaceholder.typicode.com/users`
};
let usersLength = 0;
let userId;

request(options,(err,response,body)=>{
    if(!err){
        console.log(response.statusCode);
        usersLength = JSON.parse(body).length;
        console.log(`Wybierz użytkownika: (${usersLength})`);
        
        rl.on('line',(input)=>{
            userId = Number(input);
            console.log(typeof userId);
            if(!userId){
                console.log(`Wybierz użytkownika: (${usersLength})`);
            }else{
                let options = {
                    method:'GET',
                    headers:{
                        'Content_type':'text/html'
                    },
                    uri:`https://jsonplaceholder.typicode.com/users/${userId}`
                };
                request(options,(err,response,body)=>{
                    if(!err){
                        console.log(response.statusCode);
                        let dane = JSON.parse(body);
                        console.log(dane.address.geo);
                    }else{
                        return console.log("Error: "+err);
                    }
                })
                rl.close();
            }   
        });

        
        
        
    }else{
        console.log(err);
    }
});