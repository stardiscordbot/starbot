module.exports = class Idioma {
  constructor() {
    return {
      permissoes: {
        membro: ['manageGuild']
      },
      pt: {
        nome: 'idioma',
        categoria: '⚙️ • Configuração',
        desc: 'Altera o idioma do bot.' 
      },
      en: {
        nome: 'lang',
        categoria: '⚙️ • Configuration',
        desc: 'Changes the bot language.'
      },
      aliases: ['idoma', 'lang', 'setlang', 'guildlang'],
      run: this.run
    }
  }
  async run(ctx) {
    const langs = ['pt-br', 'en-us', 'pt-zeDroguinha'];

    if (!ctx.args[0]) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.multiLang.insertLang}`.replace('%p', ctx.prefix).replace('%langs', langs.join(', ')))
    }

    var langSelecionada = null;
    langs.map(lang => {
      if (ctx.args[0] === lang) {
        langSelecionada = lang;
      }
    })

    if (langSelecionada === null) {
      return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.multiLang.unknownLanguage}`.replace('%langs', '`'+langs.join(', ')+'`'));
    } else {
      switch (langSelecionada) {
        case langs[0]:
        await db.set(`idioma-${ctx.message.guildID}`, langs[0]);
        return ctx.send(':white_check_mark: **|** Agora irei falar `português-brasileiro` neste servidor!');
        break;
        case langs[1]: 
        await db.set(`idioma-${ctx.message.guildID}`, langs[1]);
        return ctx.send(':white_check_mark: **|** Now I will speak `english-us` on this guild!')
        break 
        case langs[2]:
        await db.set(`idioma-${ctx.message.guildID}`, langs[2]);
        return ctx.send(':white_check_mark: **|** Qual é meno agora irei falar `português-zé-droguinha` nesse servidor tlgd?');
        break;
      }
    }
  }
}
