const translate = require('@vitalets/google-translate-api');

module.exports.run = (client, message, args, prefix) => {
 
  if (!args[0]) {
    return message.quote(`Use dessa forma: s!traduzir <lingua> + <lingua> <mensagem>`)
  }
  
  let msg = args.slice(2).join(' ');
  translate(msg, { from: args[0], to: args[1] }).then(res => {
     let embed = new Discord.MessageEmbed()
      .setTitle(`Google Tradutor`)
      .setColor('BLUE')
      .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png')
      .setDescription(`Texto traduzido de ` + "`" + `${langs[args[0]]}` + "`" + " para " + "`" + `${langs[args[1]]}` + "`")
      .addField('Texto original:', msg)
      .addField(`Texto traduzido:`, res.text)   
    
    message.quote(embed)
  

  }).catch(err => {
    console.log(err)
    message.quote('Desculpe mas essa lingua não existe.')
  })
};
exports.help = {
    name: 'traduzir',
    aliases: ['translate'],
    status: "on"
}