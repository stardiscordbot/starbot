module.exports = class ExampleCommand {
  constructor () {
    return {
      permissoes: {
        membro: [], // Permissoes que o usuario necessita
        bot: [], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'exemplo',
        categoria: '📖 • Informação',
        desc: 'Comando de Exemplo'
      },
      en: {
        nome: 'exemplo',
        categoria: '📖 • Information',
        desc: 'Example Command'
      },
      ja: {
        nome: '例',
        categoria: '📖 • 情報',
        desc: 'コマンドの例'
      },
      aliases: ['ex', 'example'],
      run: this.run
    }
  }

  async run (ctx) {
    ctx.send('belo exemplo')
  }
}

// ADG, Davi e LRD
