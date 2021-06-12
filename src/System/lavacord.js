require("colors")
const {
    spotify
} = require("../config/player")
const {
    Manager
} = require("erela.js");

const nodes = [{
    host: "localhost",
    port: 2333,
    password: "adgpass"
}]
const Deezer = require("erela.js-deezer");
const Spotify = require("erela.js-spotify");

const clientID = spotify.id;
const clientSecret = spotify.secret;

require("./StarPlayer")
star.music = new Manager({
        nodes: nodes,

        plugins: [
            new Spotify({
                clientID,
                clientSecret
            }),
            new Deezer()
        ],

        autoPlay: true,
        send(id, payload) {
            const guild = star.guilds.get(id);
            if (guild) guild.shard.sendWS(payload.op, payload.d);
        },
    })
    .on("nodeConnect", node => console.log(`[LAVALINK] Node ${node.options.identifier} conectado`.green))
    .on("nodeError", (node, error) => console.log(`[LAVALINK] Node ${node.options.identifier} teve um erro: ${error.message}`.red))
    .on("trackStart", async (player, track) => {
        let ch = await star.getRESTChannel(player.textChannel)
        var idioma = require('../config/idiomas.js');
        var lang = (await db.get(`idioma-${ch.guild.id}`)) || 'pt_br';
        lang = lang.replace(/-/g, '_');
        idioma = idioma[lang];

        let embed = new star.manager.ebl;
        embed.title(idioma.erela.np)
        embed.description(`> \`${track.title}: ${track.requester.username}#${track.requester.discriminator}\``)
        embed.color('#dd3af0')
        embed.thumbnail(star.user.avatarURL)
        ch.createMessage(embed.create);
    })
    .on("queueEnd", async (player) => {
        let ch = await star.getRESTChannel(player.textChannel)
        var idioma = require('../config/idiomas.js');
        var lang = (await db.get(`idioma-${ch.guild.id}`)) || 'pt_br';
        lang = lang.replace(/-/g, '_');
        idioma = idioma[lang];

        let embed = new star.manager.ebl;
        embed.title(`🛑 ${idioma.erela.endt}`)
        embed.description(`> ${idioma.erela.end}`)
        embed.color('#dd3af0')
        embed.thumbnail(star.user.avatarURL)
        ch.createMessage(embed.create);
        player.destroy();
    });