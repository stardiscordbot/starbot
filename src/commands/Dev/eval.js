module.exports = class EvalCommand {
  constructor() {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: true
      },
      pt: {
        nome: 'eval',
        categoria: '💻 • Developer',
        desc: 'Roda codigos'
      },
      en: {
        nome: 'eval',
        categoria: '💻 • Developer',
        desc: 'Run codes'
      },
      aliases: ['e', 'ev'],
      run: this.run
    }
  }
  async run(client, msg, argumentos, prefixoCerto) {

    let args = argumentos;
    
    if(!args.length) return msg.channel.send("Da um eval ai meu patrão")

    try {
      var ram = process.memoryUsage().rss/1024/1024
      let bot = client;
      let c = client;
      let star = client;
      let message = msg;
      let m = msg;
      let code = await eval(args.join(" "));
      if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 });
      msg.channel.send(`📩 Entrada \`\`\`js\n${args.join(" ")}\`\`\`\n🚩 Saída \`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
    } catch(e) {
      msg.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
  }
}

// BONEE :) 