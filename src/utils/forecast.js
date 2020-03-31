const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d7d4de7dd87d12c5c4fcbb86051336be/' + latitude + ',' + longitude + '?units=si';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to forecast weather. Please try again!!', undefined);
        } else if (body.error || !body.daily || !body.currently) {
            callback('unable to find location. Please try again!!', undefined);
        } else {
            const dailyObj = body.daily.data[0]
            callback(undefined, {
                currentForecast: '<br>It is currently ' + body.currently.temperature + ' degrees outside, with ' + body.currently.precipProbability + '% chances of rain.' + '<br>',
                dailyForecast: 'High: ' + dailyObj.temperatureHigh + ', Low: ' + dailyObj.temperatureLow
            })

        }
    })
}

module.exports = forecast;