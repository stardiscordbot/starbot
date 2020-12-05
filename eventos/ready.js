const { client } = require("../bot.js");
const c = require("colors");
const config = require("../config.json");

client.on("ready", () => {
    let activities = [
        `Utilize ${config.prefix}ajuda para ver meus comandos ^^`,
        `Amor para todo o mundo ❤️!`,
        `Alegria para todos os meus usuários`,
        `Ultilize ${config.prefix}ajuda para votar em mim!`,
        `Entre em meu servidor de suporte! https://discord.gg/2pFH6Yy`
      ],
      i = 0;
    setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
       type: "STREAMING", url: "https://www.twitch.tv/adg_ofc"
        }), 10000);
    client.user
          .setStatus("online")
          .catch(console.error);
    console.log(c.brightGreen('[LOGIN] - Estou Online!'))
});