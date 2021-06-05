module.exports = class Ajuda {
    constructor() {
        return {
            pt: {
                nome: 'ajuda',
                categoria: '📖 • Informação',
                desc: 'Veja minha lista de comandos!',
                exemplos: [
                    "ajuda",
                    "ajuda ping"
                ]
            },
            en: {
                nome: 'help',
                categoria: '📖 • Information',
                desc: 'View my command list!',
                exemplos: [
                    "help",
                    "help ping"
                ]
            },
            aliases: ['help', 'cmds', 'commands', 'comandos'],
            run: this.run
        }
    }

    async run(ctx) {
        const lang = `${await db.get(`idioma-${ctx.message.guildID}`)}`.split('-').filter(a => a.length > 0);
        var comando = star.commands.get(ctx.args[0]);
        const embed = new star.manager.ebl;

        var devs = [];
        var desenvolvedores = await db.get('devs');
        for (const desenvolvedor of desenvolvedores) {
            const dev = await star.getRESTUser(desenvolvedor);
            devs.push(dev.username);
        }

        if (comando) {
            if(comando.permissoes.dono == true) return;
            embed.color('#dd3af0');
            embed.description('✍️ '+comando[lang[0]].desc);
            embed.field('Categoria', comando[lang[0]].categoria);
            if (comando[lang[0]].exemplos) {
                embed.field('Exemplos', comando[lang[0]].exemplos);
            }
            if (comando.aliases) {
                embed.field('Sinônimos', comando.aliases.join(', '));
            }
            embed.footer(ctx.idioma.help.creators+devs.join(', ')); 
            return ctx.message.channel.createMessage(embed.create);
        }

        var categorias = [];
        star.commands.map(comando => {
            categorias.push(comando[lang[0]].categoria);
        });

        categorias = [...new Set(categorias)];
        for (const categoria of categorias) {
            var comandos = star.commands
            .filter(cmd => cmd[lang[0]].categoria === categoria)
            .map(cmd => {
                return `\n**${cmd[lang[0]].nome}**\n\`${cmd[lang[0]].desc}\``;
            });
            comandos = [...new Set(comandos)];
            embed.field(categoria, `${comandos}`);
        }
        
        embed.title(ctx.idioma.help.title+star.user.username);
        embed.description(ctx.idioma.help.description.replace('%p', ctx.prefix))
        embed.color('#dd3af0');
        embed.thumbnail(star.user.avatarURL);
        embed.footer(ctx.idioma.help.creators+devs.join(', '));

        ctx.message.channel.createMessage(embed.create);
    }
}