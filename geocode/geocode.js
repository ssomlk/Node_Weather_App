/**
 * Created by shank on 23/04/2018.
 */
const request = require("request");

const GOOGLE_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxx";

var geocodeAddress = (address, callback) => {

    const encoded_address = encodeURIComponent(address);
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}&key=${GOOGLE_API_KEY}`,
        json:true
    },(error, response, body) => {
        if(error){
            callback(`Unable to connect to the Google Servers ${error.toString()}`);
        }else if(body.status === "ZERO_RESULTS"){
            callback("Unable to find the address provided");
        }else if(body.status === "INVALID_REQUEST"){
            callback("Invalid request. Missing the 'address', 'components', 'latlng' or 'place_id' parameter.");
        }else if(body.status === "OK") {
            callback(undefined,{
                Address : `${body.results[0].formatted_address}`,
                Longitude : `${body.results[0].geometry.location.lng}`,
                Latitude : `${body.results[0].geometry.location.lat}`
            });
        }
    });
};

module.exports = {
    geocodeAddressFunc:geocodeAddress
};
