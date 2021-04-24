const botlist = require("../src/config/json/botlist.json");
const Listcord = require('listcord.js');
//const IBL = require("infinity-api");
const express = require("express");
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

    client.on("ready", () => {

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