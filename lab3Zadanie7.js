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
let users = [];

request(options,(err,response,body)=>{
    if(!err){
        //console.log(response.statusCode);
        users = JSON.parse(body);
        //console.log(typeof users);
        usersLength = JSON.parse(body).length;
        console.log(`Wybierz użytkownika: 1-${usersLength}`);
        
        rl.on('line',(input)=>{
            userId = input;
            console.log("userId: "+userId);
            //console.log("id: ",users[userId-1]);
            if(!users[userId-1]){
                return console.log('Nie ma takiego użytkownika:');
            }else{
                let options = {
                    method:'GET',
                    headers:{
                        'Content_type':'text/html'
                    },
                    uri:`https://jsonplaceholder.typicode.com/users/${userId}`
                };
                return request(options,(err,response,body)=>{
                    if(!err){
                        console.log(response.statusCode);
                        user = JSON.parse(body);
                        console.log(user.address.geo);
                    }else{
                        return console.log("Error: "+err);
                    }
                    rl.close(); 
                })
            };             
            });          
    }else{
        console.log(err);
    }
});