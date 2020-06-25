var Weather = require('../index');

var weather = new Weather(apiKey);
var execlusions = 'minutely';
weather.get(lat, long, execlusions, function(err, res, data){
    if(err)
    {
        console.log('error processing');
    } else{
        console.log(data.current);
    }
});
