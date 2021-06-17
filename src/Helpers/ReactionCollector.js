// Criado por lrd#0007
const {
    Client,
    Message,
    User
} = require('eris');

const Event = require('events');
const handler = new Event();
var ended = false;
var collected = [];

function ErisReactionCollector(client = Client, filter = {}, timeout = 150000) {
    client.on('messageReactionAdd', (message, emoji, user) => {
        check(message, emoji, user, filter);
    })

    _timeout(client, timeout);
    return handler;
}

function check(message = Message, emoji, user = User, filter = {}) {
    if (ended) return;
    if (message.id !== filter.message.id) return;
    if (emoji.name !== filter.emoji) return;
    if (user.id !== filter.user.id) return;
    handler.emit('collect', message, emoji, user);
    collected.push({
        message: message,
        emoji: emoji,
        user: user
    });
}

function _timeout(client, time) {
    setTimeout(() => {
        ended = true;
        handler.emit('end', collected);
        client.removeListener('messageReactionAdd', (message, emoji, user) => {})
    }, time)
}

module.exports = ErisReactionCollector;