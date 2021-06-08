module.exports = class RbuserCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: ['embedLinks'],
          dono: false
        },
        pt: {
          nome: 'fnshop',
          categoria: '🎮 • Jogos',
          desc: 'Mostra a loja do Fortnite'
        },
        en: {
          nome: 'fnshop',
          categoria: '🎮 • Jogos',
          desc: 'Show the Fortnite store'
        },
        aliases: ['fnstore'],
        run: this.run
      }
    }
    async run(ctx) {
      const embed = new star.manager.ebl;
      embed.title(`<a:st_fortnite:850423265540440074> Fortnite | Shop`)
      embed.image("https://fortool.fr/cm/assets/shop/en.png")
      embed.color('#dd3af0')
      ctx.send(embed.create);
  }
}  
// ADG