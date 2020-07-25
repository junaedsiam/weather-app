const request = require('request');

const ACCESS_KEY= '527e59c6dabbf013e1cf6102d4a944ed';
//https://api.darksky.net/forecast/[key]/[latitude],[longitude]
const URL = 'https://api.darksky.net/forecast/';


const forecast = (pos,callback) => {
    const url = `${URL}${ACCESS_KEY}/${pos.lat},${pos.long}?units=si&exclude=minutely,hourly,daily,alerts,flags`;
    request({url,json:true}, (err, {body}) => {
        if(err){
            callback(err,undefined);
        }else if(body.error){
            callback(body.error,undefined)
        }else{
            callback(undefined,body);
        }
    });
}

module.exports = forecast;
