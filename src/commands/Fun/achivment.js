module.exports = class VarporwaveCommand {
	constructor(){
	  return {
		permissoes: {
		  membro: [], //Permissoes que o usuario necessita
		  bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
		  dono: false //Se apenas nos devs podem usar o comando
		},
		pt: {
		  nome: 'conquista',
		  categoria: '🤣 • Fun',
		  desc: 'Crie uma nova conquista em imagem do Minecraft!'
		},
		en: {
		  nome: 'achievement',
		  categoria: '🤣 • Fun',
		  desc: 'Create a new Minecraft image achievement!'
		},
	  aliases: ['mcconquista'],
	  run: this.run
	  }
	}
	
	async run(client, message, args, prefixoCerto, idioma) {
	  
	  const { createCanvas, loadImage, registerFont } = require('canvas');
  
	  const { shortenText } = require('../../../utils/Canvas');
  
	  const path = require('path');
  
	  registerFont(path.join(__dirname, '..', '..', 'fonts', 'Minecraftia.ttf'), { family: 'Minecraftia' });
  
	  if((args.join(" ").length) > 300) return message.quote(idioma.image.long.replace("%u", message.author))
  
	  if(!args[0]) return message.quote(`${idioma.image.args.replace("%u", message.author)}`)
  
	  const text = args.join(" ")
  
	  message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async msg => {
	  
	  const base = await loadImage('https://cdn.discordapp.com/attachments/719978696278278224/806209796889903224/achievement.png');
  
	  const canvas = createCanvas(base.width, base.height);
		  const ctx = canvas.getContext('2d');
		  ctx.drawImage(base, 0, 0);
		  ctx.font = '17px Minecraftia';
		  ctx.fillStyle = '#ffff00';
		  ctx.fillText(`${idioma.image.achivment}`, 60, 40);
		  ctx.fillStyle = '#ffffff';
		  ctx.fillText(shortenText(ctx, text, 230), 60, 60);
  
		  return message.quote({ files: [{ attachment: canvas.toBuffer(), name: `achievement-${message.author.id}.png` }] }).then(message => {
		msg.delete()
	  })
		
	  })
  
	}
  }
//ADG