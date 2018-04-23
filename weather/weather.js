/**
 * Created by shank on 23/04/2018.
 */
const request = require("request");

const FORECAST_API_KEY = "b220e6ff4ad1a639d554fa30cfe654fc";

var weatherDetails = (locationData, callback) => {
    request({
        url:`https://api.darksky.net/forecast/${FORECAST_API_KEY}/${locationData.Latitude},${locationData.Longitude}`,
        json:true
    },(error,response,body) => {
        if(error){
            callback('Unable to connect to Forcast Weather services');
        }
        else if(response.statusCode === 400){
            callback('The given location is invalid.');
        }
        else if(response.statusCode === 200 && !error){
            callback(undefined,{
                Address:locationData.Address,
                Longitude:locationData.Longitude,
                Latitude:locationData.Latitude,
                Temperature:body.currently.temperature
            })
        }
    });
};

module.exports = {
    weatherDetails
};
