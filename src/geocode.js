const request = require('request');

const ACCESS_TOKEN = 'pk.eyJ1IjoianVuYWVkLXNpYW0iLCJhIjoiY2s1MnA5MWw0MDA4NDNlcXR2NzVzY2J2NSJ9.d4Bp1KPaw4E_V7r2FIsdsA';
const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const geoCode = (place, callback) => {
    const url = `${URL}${encodeURIComponent(place)}.json?access_token=${ACCESS_TOKEN}`
    request({url, json:true},(err,{body}) => {
        if(err){
            // return console.log('Unable to connect with the server');
            callback('Unable to connect with the api',undefined);
        }
        else if(!body.features.length){
            callback('Invalid search string! Please provide a valid location',undefined)
        }
        else{
            const data = {
                location:body.features[0].place_name,
                long:body.features[0].center[0],
                lat:body.features[0].center[1],
            }
            callback(undefined,data)
        }
      
    })
}

module.exports = geoCode;