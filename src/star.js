// Cores
require('colors');

// Código rs
const Eris = require("eris");

// Inciando a star.
const {
    token,
    prefix,
    database,
    webhook
} = require('./config/config.js');

const client = new Eris(token, {
    restMode: true,
    defaultImageSize: 2048,
    defaultImageFormat: "png",
    autoreconnect: true,
    rest: {
        baseURL: "/api/v9"
    }
});

// Setando comandos.
client.commands = new Eris.Collection();
client.aliases = new Eris.Collection();
client.events = new Eris.Collection();

const Star = require('./client/starbot.js');

const StarBot = new Star(client);

StarBot.iniciar().then((star) => {
    console.log(`[CLIENT] ${star}, Tudo Carregado!`.dim.brightMagenta);
    StarBot.inlineReply();
});

global.star = client;
star.manager = StarBot;
// Setando database

global.db = require('star-database-manager');

//db.once('ready', () => {
//  console.log('[DATABASE] Database iniciada com sucesso.'.brightYellow);
//});

// Handler.
require('./client/handler/comandos.js');
require('./client/handler/eventos.js');

// LRD