module.exports = class EvalCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: [],
          dono: false
        },
        pt: {
          nome: 'captcha-test',
          categoria: '💻 • Desenvolvedor',
          desc: 'Comando de testes'
        },
        en: {
          nome: 'captcha-test',
          categoria: '💻 • Developer',
          desc: 'Test command'
        },
        aliases: ['cap'],
        run: this.run
      }
    }
    async run(ctx) {
    const {MessageAttachment} = require("discord.js-light")
    const Canvas = require("canvas")
    Canvas.registerFont(`fonts/BadScript-Regular.ttf`, { family: "BadScript" })

    let captcha = Math.random().toString(36).slice(2, 8)
    let canvas = Canvas.createCanvas(170, 50)
    let cav = canvas.getContext("2d")

    cav.fillStyle = "#FFFFFF"
    cav.fillRect(0, 0, canvas.width, canvas.height)
    cav.fillStyle = "#000001"
    cav.font = "35px BadScript"
    cav.fillText(captcha, canvas.width / 5.5, canvas.height / 1.5)
    let cap = new MessageAttachment(canvas.toBuffer(), "captcha.jpg")
    
    ctx.send(`${ctx.message.author.mention}, para liberar o servidor insira o conteúdo da mensagem a baixo`, cap).then(ms => {
      const filter = m => m.content.includes(captcha);
      const collector = ctx.sendCollector(filter, { time: 60000 });
      
      collector.on('collect', m => {
        if(m.author.id !== ctx.message.author.id) return;
        m.addMessageReaction("✅")
        collector.stop()
        ctx.message.member.roles.add("844590865774936115", "Captcha System")
        console.log(`Collected ${m.content}`);
      });
      collector.on('end', collected => {
        if(collected.size < 0) {
          //ctx.message.member.kick()
        }
        console.log(`Collected ${collected.size} items`);
      });
    })
  }
}
  // LRD