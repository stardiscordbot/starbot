module.exports = class MangaCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: ['embedLinks'],
          dono: false
        },
        pt: {
          nome: 'manga',
          categoria: '📘 • Anime',
          desc: 'Para pesquisar manga no MAL'
        },
        en: {
          nome: 'manga',
          categoria: '📘 • Anime',
          desc: 'To search manga on MAL'
        },
        aliases: ['mmanga', 'malmanga'],
        run: this.run
      }
    }
    async run(ctx) {        
        if(!ctx.args[0]) return ctx.addMessageReaction("❌")
        const fetch = require("star-fetch")
        const res = fetch(`https://api.jikan.moe/v3/search/manga?q=${ctx.args.join(" ").replace(/ /g, '%20')}&order_by=title&sort=asc&limit=100`)
        let anime = res.results[0]

                let embed = new star.manager.ebl;
                embed.title(`📚 Manga | ${anime.title}`)
                embed.url(anime.url)
                embed.description(anime.synopsis)
                embed.field(`📺 Volumes:`, `\`${anime.volumes}\``)
                embed.field(`⭐ Score:`, `\`${anime.score}\``)
                embed.field(`💻 Mal ID:`, `\`${anime.mal_id} [${anime.url}]\``)
                embed.thumbnail(anime.image_url)
                embed.color('#dd3af0')
                ctx.message.channel.createMessage(embed.create)
        }
  }

// ADG