const botlist = require("../src/config/json/botlist.json");
const Listcord = require('listcord.js');
//const IBL = require("infinity-api");
const DBL = require("dblapi.js");
const cor = require("colors");

module.exports = async (client) => {

    client.listcord = new Listcord.Client(botlist.apikey.listcord);

    //client.ibl = new IBL("719524114536333342", botlist.apikey.ibl)
    
    client.dbl = new DBL(botlist.apikey.dbl, client);
    
    client.dbl.on('posted', () => {
        console.log('[DBL] Postado');
    })

    client.on("ready", () => {

        //setInterval(() => { 
          //  client.ibl.postStats(client.guilds.cache.size, client.options.shardCount)
        //}, 900000)

        client.listcord.createAutoPoster(client, {
        interval: 900000,
        startOnInitiate: true
        })

        client.listcord.postStats('719524114536333342', client.guilds.cache.size);

        client.listcord.on('rateLimit', () => 
        console.log('Looks like we have sent so much requests! So its 429!')
        );

    })
}   