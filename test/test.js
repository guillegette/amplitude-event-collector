require('dotenv/config');
const tracker = require('../index.js');

describe('collect and send events', () => {
    it('should add an event', (done) => {
        for(var i=0; i<25; i++){
            tracker.newEvent({
                id: i+'-12312312',
                properties: {
                    name: 'John'
                }
            },{
                name: 'test_event',
                properties: {
                    platform: 'mocha'
                }
            });
        }
        setTimeout(() => {
            return done();
        }, 10000);
    });
});
