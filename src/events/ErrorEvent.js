const {client} = require("../../bot.js");
const config = require("../config.json");
const Discord = require('discord.js')
const c = require('colors')
// Arquivos
const bldb = require("../mongodb/blacklist.js");
const dc = require('../mongodb/dc.js')
const pr = require("../mongodb/prefix");
const autorole = require('../mongodb/autorole.js');
const welcomeChannel = require('../mongodb/WelcomeChannel.js');
const logChannel = require('../mongodb/messagelog.js');
const economy = require("../mongodb/economy.js");
const antilink = require('../mongodb/antilink');
// Inicio do Code
client.on('error', (err) => {
    console.log(c.red(`Ocorreu um erro, infelizemnte não conseguir ser iniciada :(`))
 });