const Discord = require('discord.js')
const {connect} = require('mongoose')
const {star} = require('../../bot')
const config = require('../config.json')
const c = require('colors')

const dbembed = new Discord.MessageEmbed()
.setTitle('Star™ | Status')
.setDescription('**[BANCO DE DADOS] - Banco de dados foi ligado**')
.setColor('ffc600')

connect(config.mongo, { 
  
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then (function () {
    console.log(c.brightYellow(`[BANCO DE DADOS] - A MongoDB foi concetada com sucesso`))
    star.send(dbembed)
}).catch (function () {
    console.log(c.brightRed(`[BANCO DE DADOS] - A MongoDB não foi conectado por erro`))
});