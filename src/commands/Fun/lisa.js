module.exports = class VarporwaveCommand {
	constructor(){
	  return {
		permissoes: {
		  membro: [], //Permissoes que o usuario necessita
		  bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
		  dono: false //Se apenas nos devs podem usar o comando
		},
		pt: {
		  nome: 'lisa',
		  categoria: '🤣 • Fun',
		  desc: 'Peça para Lisa Simpson pronunciar algo!'
		},
		en: {
		  nome: 'lisa',
		  categoria: '🤣 • Fun',
		  desc: 'Ask Lisa Simpson to say something!'
		},
	  aliases: ['lina'],
	  run: this.run
	  }
	}
	
	async run(client, message, args, prefixoCerto, idioma) {
	  
	  const DIG = require("discord-image-generation");
  
	  if((args.join(" ").length) > 300) return message.quote(idioma.image.long.replace("%u", message.author))
  
	  if(!args[0]) return message.quote(`${idioma.image.args.replace("%u", message.author)}`)
  
	  const texto = args.join(" ")
  
	  message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async msg => {
		message.channel.startTyping()
	  const img = await new DIG.LisaPresentation().getImage(texto);
		  
	  const attachment = new (require('discord.js')).MessageAttachment(img, `lisa-${message.author.id}.png`);
  
		message.quote(message.author, attachment).then(message => {
			message.channel.stopTyping()
		  msg.delete()
		})
		
	  })
  
	}
  }
//ADG