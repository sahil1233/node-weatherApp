const request = require('request')
const forecast = (latitude,longitude, callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=8cb6f6843e8f415611881b63f7e16d18&query='+latitude+','+longitude+'&units=f';

request({url, json:true},(error,{body})=>{
    if(error){
        callback('Cannot connect to weather services',undefined)
    } else if(body.error){
        callback('cannot find the weather try again',undefined)
    } else {
       callback( undefined,body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature + ' degree and feels like ' + body.current.feelslike+ ' degree and humidity is' + body.current.humidity + '%.'
        )
    }
})
}

module.exports = forecast

