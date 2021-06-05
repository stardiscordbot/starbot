module.exports = class EvalCommand {
  constructor() {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: true
      },
      pt: {
        nome: 'recarregar',
        categoria: '💻 • Desenvolvedor',
        desc: 'Recarrega o bot'
      },
      en: {
        nome: 'reload',
        categoria: '💻 • Developer',
        desc: 'Reload bot'
      },
      aliases: ['red', 'reload'],
      run: this.run
    }
  }
  async run(ctx) {
    ctx.send('🔁 Recarregando arquivos...').then((m) => {
      star.manager.reload().then(() => {
        m.edit(`✅ Arquivos recarregados!\n⚠️ Entre esses arquivos haviam **${star.commands.size}** comandos e ${star.events.size} eventos!`);
      });
    });
}
}

// LRD