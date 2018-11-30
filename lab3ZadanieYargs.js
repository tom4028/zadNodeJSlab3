const yargs = require('yargs').argv;
const request = require('request');
const fs = require('fs');

let appid = "5c93c428e6adf538aadd8d533068be7b"

let usersLength = 0;
let users = [];

//sole.log(typeof userNum);


let options = {
    method:'GET',
    headers:{
        'Content_type':'text/html'
    },
    uri:`https://jsonplaceholder.typicode.com/users`
};



let dane = (cb)=>{
    request(options,(err,response,body)=>{
    if(!err){
        console.log(response.statusCode);
        let data = JSON.parse(body);
        cb(null,data);
    }else{  
        cb(err,null);
    }
});
};



dane((err,data)=>{
    if(!err){
        users = data.slice();
        usersLength = users.length;
        let userNum = yargs.userNum;
        //console.log(!userNum,typeof userNum,userNum);
        console.log(`Podaj numer: 1-${usersLength}`);
        if(!userNum || (typeof userNum)!='number' || userNum>usersLength){
            console.log(`Podaj numer: 1-${usersLength}`);
        }else{
            let lat = users[userNum-1].address.geo.lat;
            let lng = users[userNum-1].address.geo.lng;
            console.log(lat,lng);
            let options1 = {
                method:'GET',
                uri:`https://api.openweathermap.org/data/2.5/weather?appid=${appid}&lat=${lat}&lon=${lng}`
            };
            request(options1,(err,response,body)=>{
                if(!err){
                    console.log(response.statusCode);
                    console.log(body);
                    fs.writeFile('pogoda.json',body,(err)=>{
                        if(!err){
                            return console.log('Dane zapisane...');
                        }

                        
                    });
                }else{
                    return console.log("Error from openWeather"+err);
                }
            });
        }    
    }else{
        console.log(err);
    }
});

// let options1 = {
//     method:'GET',
//     headers:{
//         'Content_type':'text/html'
//     },
//     uri:`https://jsonplaceholder.typicode.com/users/${userId}`
// };





