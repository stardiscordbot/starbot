module.exports = class PerfilCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'perfil',
          categoria: '💸 • Economia',
          desc: 'Mostra o seu perfil'
        },
        en: {
          nome: 'profile',
          categoria: '💸 • Economy',
          desc: 'Show your profile'
        },
      aliases: ['perfil', 'profile'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
      const user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author
      const economy = require("../../config/database/mongodb/economy");

      const marryid = await client.db.get(`marry-${user.id}`)
      const sobre = await client.db.get(`about-${user.id}`)
      const c = {}

      if(!sobre) {
        c.desc = idioma.perfil.desc.replace("%p", prefixoCerto)
      }

      if(sobre) {
        c.desc = `${sobre}`
      }

      if(!marryid) {
        c.name = `${idioma.perfil.ngm}`
        c.dis = "0001"
      }

      if(marryid) {
        const marry = await client.users.fetch(marryid)
        c.name = marry.username
        c.dis = marry.discriminator
      }

      var eco = 0

      economy.findOne({ User: user.id }, async(err, data) => {
      message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async msg => {
      
        if(data) {
          eco = eval(data.Money + data.Bank)
        } else {
          eco = 0
        }

        const jimp = require("jimp");
        const fs = require("fs");
        const av = user.displayAvatarURL({dynamic:false, format: 'png', size: 2048})
            // ÁREA DE SELECIONAR A MIDIA
            let avatar = await jimp.read(`${av}`)
            let mascara = await jimp.read("./images/mascara.png");
            let background = await jimp.read("./images/background.jpg");
            let profile = await jimp.read("./images/StarProfileModel.png");
        
            // ÁREA DE SELECIONAR AS FONTES
            let font50 = await jimp.loadFont("./font/font_white_50.fnt");
            let font30 = await jimp.loadFont("./font/font_yellow_30.fnt");
            let font35 = await jimp.loadFont("./font/font_white_35.fnt");
            let font20 = await jimp.loadFont("./font/font_white_20.fnt");
        
            // ÁREA DE REDIMENCIONAMENTO DE IMAGEM
            avatar.resize(149, 149);
            mascara.resize(149, 149);
            background.resize(700, 500);
        
            // ÁREA DE CORTE
            avatar.mask(mascara);
        
            // ÁREA DE MESCLAGEM
            profile.composite(avatar, 18, 176);
            background.composite(profile, 0, 0);
        
            // ÁREA DE ESCRITA
            background.print(font20, 10, 400, c.desc, 690);
            background.print(font35, 245, 266, `¥${eco.toLocaleString()}`);
            background.print(font35, 260, 313, c.name, (err, image, { x, y }) => {
                background.print(font20, x + 3, y - 29, "#" + c.dis, 50);
            });
            background.print(font50, 190, 185, user.username, (err, image, { x, y }) => {
                background.print(font30, x + 5, y - 101, "#" + user.discriminator, 50);
            }).write(`./ProfileFinal.png`);

            const path = `./ProfileFinal.png`;
            const attachment = new (require("discord.js")).MessageAttachment("./ProfileFinal.png");
            
            message.quote(attachment).then(m => {

              msg.delete()

              fs.unlink(path, err => {
                if (err) {
                  console.error(err);
                  return;
                }
              });
            })
        })
      })
    }
  }
  
  //Nome de quem fez ou ajudou