const { 
    Message,
    User
} = require('eris');

const Event = require('events');
const handler = new Event();
var ended = false;
var collected = [];

function ErisMessageCollector(client, filter = {}, timeout = 150000) {
    if (!filter) throw new Error('Please provide a filter.');
    if (!client) throw new Error('Please provide the client for the collection.');

    if (!filter.user) throw new Error('Please provide a user to filter.');
    if (!filter.types) throw new Error('Please provide a types array to filter.\nTypes: includes, equals, starts');

    client.on('messageCreate', message => {
        check(message, message.author, filter);
    })

    _timeout(client, timeout);
    return handler;
}

function check(message = Message, user = User, filter = {}) {
    if (ended) return;
    if (filter.types.includes('includes')) {
        if (!message.content.includes(filter.text)) return;
    }
    if (filter.types.includes('equals')) {
        if (message.content !== filter.text) return;
    }
    if (filter.types.includes('starts')) {
        if (!message.content.startsWith(filter.text)) return;
    }

    if (user.id !== filter.user.id) return;
    collected.push({
        message: message,
        user: user
    });
    
    handler.emit('collect', message, user);
}

function _timeout(client, time) {
    setTimeout(() => {
        ended = true;
        handler.emit('end', collected, 'timeout');
        client.removeListener('messageCreate', message => {})
    }, time)
}

function end(reason) {
    ended = true
    handler.emit('end', collected, (reason || 'none'));
}

handler.end = end;

module.exports = ErisMessageCollector;