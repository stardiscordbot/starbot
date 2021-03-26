module.exports = class BackgroundCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['EMBED_LINKS', 'ATTACH_FILES'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'background',
          categoria: '💸 • Economia',
          desc: 'Compre Planos de Fundo para seu perfil'
        },
        en: {
          nome: 'background',
          categoria: '💸 • Economy',
          desc: 'Buy Backgrounds for your profile'
        },
      aliases: ['background'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
      
      const background = require("../../config/database/backgrounds.json");
      const economy = require("../../config/database/mongodb/economy");
      const tema = background.backgounds[rand];

      const embed = new (require("disccord.js")).MessageEmbed()
      .setColor(colors.default)
      .setDescription(`Você pode comprar esse **Tema de Fundo** para o seu perfil por:` +
          `\n:yen: **| Valor**: \`¥${numberFormatter("#,##0.00", tema.value)}\`` +
          `\n\nPara aceitar, clique no 🛍️ para realizar o pagamento!`)
      .setImage(tema.url)
    }
  }
  
  //Nome de quem fez ou ajudou