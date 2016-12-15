const cp = require('child_process');
const collector = cp.fork(__dirname+'/collector.js');

process.on('exit', () => {
    collector.kill();
});

module.exports = {
    newEvent: function(user, event){
        var userId = user.id,
            userProps = user.properties || {},
            eventName = event.name,
            eventProps = event.properties || {};

        return collector.send({
            user_id: userId,
            event_type: eventName,
            user_properties: userProps,
            event_properties: eventProps,
            time: event.time ? event.time : new Date().getTime()
        });
    }
};

