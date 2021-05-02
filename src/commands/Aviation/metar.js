module.exports = class MetarCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'metar',
          categoria: '✈️ • Aviação',
          desc: 'Mostra o clima em algum aeroporto'
        },
        en: {
          nome: 'metar',
          categoria: '✈️ • Aviation',
          desc: 'Shows the weather at an airport'
        },
      aliases: ['weather', 'tempo', 'clima'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
        const keys = require("../../config/json/keys.json")
        const fetch = require("node-fetch");
        const options = {
          headers: {'X-API-Key': keys.av}
        };
        if(!args[0]) return message.quote(`:x: ${message.author} **|** Insira o icao do aeroporto, exemplo \`s!metar SBRJ\``)
        fetch(`https://api.checkwx.com/metar/${args[0]}/decoded`, options)
        .then(res => res.json())
        .then(json => {
        json.data.map(met => {
        console.log(met)
        let ember = new (require("discord.js")).MessageEmbed()
        .setAuthor(`🌎 Airport: ${met.station.name}`)
        .setColor("BLUE")
        .setDescription(`**🛩️ ICAO:** ${met.icao}\n**📖 Raw Report:** ${met.raw_text.toLocaleString()}\n**🧑‍✈️ Flight Rule:** ${met.flight_category}\n**☁️ Clouds:**\n> Feet: ${met.clouds.map(a => a.base_feet_agl.toLocaleString())}\n> Meters: ${met.clouds.map(a => a.base_meters_agl.toLocaleString())}\n**🗺️ Location:** ${met.station.location}`)
        .setFooter(idioma.metar.ft, "https://i.imgur.com/BJko5HW.png")
        message.quote(message.author, ember)
        })
        })
    }
  }
  
  //ADG