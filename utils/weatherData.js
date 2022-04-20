const request = require('request')
const rxpress =require('express')
const constants = require('../utils/config')

const weatherData = (address, callback)=>{
    const url = constants.OpenWeatherMap.BASE_ULR + encodeURIComponent(address) + '&appid=' + constants.OpenWeatherMap.SECRET_KEY;
    console.log(url)
    request({url, json:true},(err,{body})=>{
        console.log(body);
        if(err){
            callback("cant find",undefined)
        }else if(!body.main || !body.main.temp || !body.name || !body.weather){
            callback("NO data",undefined)
        }
        else{
            callback(undefined,{
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;