var querystring = require('querystring');
var request = require('request');

function Weather(apiKey){
    if(!apiKey) throw new Error('APIKey must be set');
    this.APIKey = apiKey;
    this.timeout = 1000;
    this.url = 'https://api.openweathermap.org/data/2.5/onecall?';
}

//helper to build our string request
Weather.prototype.buildUrl = function buildUrl(latitude, longitude, exclusions){
    var url = this.url + 'lat=' + latitude + '&' + 'lon=' + longitude + '&exclude=' + exclusions + '&appid=' + this.APIKey;
    console.log(url);
    return url;
}

Weather.prototype.get = function get(latitude, longitude, exclusions, callback){
    //Since exclusions is optional, we will handle the callback in its place
    if(typeof exclusions === 'function'){
        callback = exclusions;
        options = {};
    }

    //build our url for the request
    var url = this.buildUrl(latitude, longitude, exclusions);

    //invoke request and returns callback function
    var header = {uri:url, timeout:this.requestTimeout};
    request.get(header, function(err, res, data){
        if(err){
            callback(err);
        } else if(res.headers['content-type'].indexOf('application/json') > -1){
            callback(null, res, JSON.parse(data));
        } else if(res.statusCode === 200){
            callback(null, res, data);
        } else {
            callback(new Error(data), res, data);
        }
    });
};

module.exports = Weather;