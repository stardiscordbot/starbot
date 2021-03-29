const botlist = require("../src/config/json/botlist.json");
const Listcord = require('listcord.js');
//const IBL = require("infinity-api");
const express = require("express");
const DBL = require("dblapi.js");
const cor = require("colors");

module.exports = async (client) => {

    const app = express();

    app.use(express.json())

    app.post("/zuraaa", function(req, res) {
        console.log(req.body)
        //res.status(200).sendFile("index.html", {root:"./views"})
        res.send({ status: 'SUCCESS' });
    })

    app.listen(80, () => {
        console.log(cor.green(`[WEBHOOK] Iniciado com Sucesso`))
    })

    client.listcord = new Listcord.Client(botlist.apikey.listcord);

    //client.ibl = new IBL("719524114536333342", botlist.apikey.ibl)
    
    

    //const dbl = new DBL(botlist.apikey.dbl, { webhookPort:5000, webhookAuth: botlist.config.authpass });
    /*
    dbl.webhook.on('ready', hook => {
        console.log(`[DBL] Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
    });

    dbl.webhook.on('voted', vote => {
        console.log(`votaram em mim, ${vote.user}`)

        const webhook = new (require("discord.js-light")).WebhookClient(botlist.votehook.id, botlist.votehook.token);
        
        const voteembed = new (require("discord.js-light")).MessageEmbed()
        .setDescription(`${vote.user} votou em mim`)
        .setColor("ff0000")
        webhook.send(voteembed)
    })

    dbl.on('posted', () => {
        console.log('[DBL] Postado');
    })
    */
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