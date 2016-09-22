const request = require('request');
var events = [];

process.on('message', (e) => {
    events.push(e);
    if(events.length >= 10){
        var payload = events.slice();
        events = [];
        return sendEvents(payload);
    }
    return;
});

function sendEvents(data){
    console.log('sending data to amplitude...');
    return request({
        type: 'POST',
        url: 'https://api.amplitude.com/httpapi',
        qs: {
            api_key: process.env.AMPLITUDE_APIKEY,
            event: JSON.stringify(data)
        }
    }, (err, res, data) => {
        if(err){
            console.error('Tracker error', err);
        }
    });
}
