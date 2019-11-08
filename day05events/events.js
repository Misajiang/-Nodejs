const { EventEmitter } = require('events');
let event = new EventEmitter();
event.on('some_events', () => {
    console.log('some_events1')
})
event.on('some_events', () => {
    console.log('some_events2')
})

event.emit('some_events')