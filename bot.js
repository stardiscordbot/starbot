require('./mongodb/blacklist.js')
const Discord = require('discord.js')
const backup = require('./discord-backup/lib/index.js')
const config = require('./config.json')
const client = new Discord.Client({ disableMentions: 'everyone'});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const fs = require('fs');
const mongoose = require('mongoose')
const bldb = require("./mongodb/blacklist.js");
const c = require('colors');
const dc = require('./mongodb/dc.js')
const pr = require("./mongodb/prefix");
const autorole = require('./mongodb/autorole.js');
const welcomeChannel = require('./mongodb/WelcomeChannel.js');
const votosZuraaa = require('./votosZuraaa.js');
const logChannel = require('./mongodb/messagelog.js');
const Money = require("./mongodb/money.js");
const antilink = require('./mongodb/antilink');
const moment = require("moment");
const ms = require('ms');
const DBL = require("dblapi.js");
const dbl = new DBL(config.dbl, client);
dbl.on('posted', () => {
  console.log(c.green('[DBL] - Servidores Postados!'));
})

dbl.on('error', e => {
 console.log(c.red(`[DBL] - ${e}`));
})

mongoose.connect(config.mongo, { 
  
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then (function () {
    console.log(c.brightYellow("[BANCO DE DADOS] - Banco de dados foi ligado"))
  }).catch (function () {
    console.log(c.brightRed("[BANCO DE DADOS] - Banco de dados desligado por erro"))
  });

  const webvotos = new Discord.WebhookClient(config.votosID, config.votosTOKEN)
  client.on('message', message => {
    // Quantidade de dinheiro adicionada ao votante
    let dailyCoins = 250;
    // Puxando o VerificaVotos
    votosZuraaa.verificaVotos(message, function(user){
      // Embed do user
        const obrigado = new Discord.MessageEmbed()
        .setTitle('🎉 Obrigado pelo seu Voto!')
        .setDescription(`Obrigada por votar em mim, cada voto me ajuda a crescer!`)
        .setColor(config.color)
        user.send(obrigado);
        // Embed do webhook
        const voted = new Discord.MessageEmbed()
        .setTitle('🥳 Obrigado pelo seu Voto!')
        .setDescription(`\`${user.tag}\` votou em mim! Vote você também e seja uma pessoa incrível!\nhttps://zuraaa.com/bots/719524114536333342/votar`)
        .setColor(config.color)
        webvotos.send(voted)
      // Fim
        });
    });

/*
client.on('message', message => {
    if (message.author.bot) return;
    pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
      let prefix = res ? res.prefix : config.prefix;
    if (message.content.startsWith(prefix)) {
          message.channel.send(`<a:alerta:763434977412120586> | ${message.author} Você está usando a versão experimental da Star:tm:. Várias funcionalidades podem não funcionar, posso ficar offline a qualquer momento, seu servidor pode explodir e muito mais! Não reporte problemas da versão experimental caso não seja solicitado, obrigada!`).then(msg=> {
            msg.delete({ timeout: 5000, reason: "pq sim" });
            })
    }
  })
}); 
*/

const comando = new Discord.WebhookClient(config.logID, config.logToken)
 client.on('message', message => {
   if (message.author.bot) return;
   if (message.channel.type == 'dm') return;
   pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
    let prefix = res ? res.prefix : config.prefix;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
            let embeddiretor = new Discord.MessageEmbed()
                .setTitle("🔔 • Log de comandos!")
                .setColor("RANDOM")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**Usuário:** \`${message.author.tag}\` \n **ID:** \`${message.author.id}\` \n **Comando:** \`${message.content}\` \n**URL:** [Clique Aqui](${message.url}) \n\n **🔍 • Dados do servidor!**\n \n **Nome:** \`${message.guild.name}\` \n **ID:** \`${message.guild.id}\` \n**Membros:** \`${message.guild.memberCount}\` \n **Canais:** \`${message.guild.channels.cache.size}\``)
                comando.send(embeddiretor);
    console.log(c.brightMagenta(`[LOG DE COMANDOS]\nUsuário: ${message.author.tag}\nID: ${message.author.id}\nComando: ${message.content}\n\n[DADOS SERVIDOR]\nNome: ${message.guild.name}\nID: ${message.guild.id}\nMembros: ${message.guild.memberCount}\nCanais: ${message.guild.channels.cache.size}`))
            });
          })

client.on("message", async message => {
    // If's
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    antilink.findOne({_id:message.guild.id}, (err, anti) => {
      if(anti){
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        if (message.member.permissions.has("ADMINISTRATOR")) return;
        if (message.content.toLowerCase().includes("https://")){
        console.log(c.bold(`[ANTILINK] - Antilink: ${message.guild.name}`))
        message.delete()
        message.reply('você não pode enviar links aqui!')
        }
        if (message.content.toLowerCase().includes("http://")){
        console.log(c.bold(`[ANTILINK] - Antilink: ${message.guild.name}`))
        message.delete()
        message.reply('você não pode enviar links aqui!')
        }
        if (message.content.toLowerCase().includes("www.")){
        console.log(c.bold(`[ANTILINK] - Antilink: ${message.guild.name}`))
        message.delete()
        message.reply('você não pode enviar links aqui!')
        }
      }
  })
    // Custom Prefix
    pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
      let prefix = res ? res.prefix : config.prefix;
      if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)){
        return message.channel.send(`<a:Rosa_seta_pg:754374503001358467> Olá, ${message.author}! Meu prefixo atual é \`${prefix}\` para ver meus comandos use \`${prefix}ajuda\``)}
    if (!message.content.startsWith(prefix)) return;
    // Deletar Comando
    dc.findOne({_id:message.guild.id}, (err, dc) => {
      if(dc){
        message.delete()
      }
    })
    // Caso o user esteja banido
    bldb.findOne({_id:message.author.id}, (err, bl) => {
      if(bl) {
        const detectado = new Discord.MessageEmbed()
        .setTitle("<a:ban_cat:768210628913266689> | Você está Banido")
        .setColor("ff0000")
        if(!bl.motivo) {
          detectado.setDescription(`Você foi banido de ultilizar a Star:tm: por desrespeitar os termos de uso, caso ache que isto é um engano contate nosso [suporte](https://discord.gg/2pFH6Yy) e tentaremos resolver\n\n**Motivo:** \`Não Definido - Punido por: ${bl.autorTag}\`\n**Apelação:** \`Você pode enviar uma apelação para seu unban: https://bit.ly/star-unban\``)
      } else if(bl.motivo) {
        detectado.setDescription(`Você foi banido de ultilizar a Star:tm: por desrespeitar os termos de uso, caso ache que isto é um engano contate nosso [suporte](https://discord.gg/2pFH6Yy) e tentaremos resolver\n\n**Motivo:** \`${bl.motivo} - Punido por: ${bl.autorTag}\`\n**Apelação:** \`Você pode enviar uma apelação para seu unban: https://bit.ly/star-unban\``)
      }
         return message.channel.send(detectado)
          }
    // Alguns Args
    var args = message.content.substring(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    let command =client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(command.help.status === 'off') return message.reply('sinto muito, esse comando está desabilitado, aguarde');
    if (command) {
      command.run(client, message, args);
    } else {
      console.log(`${message.author} Usou o comando inexistente ${message.content}`);
    }
  });
})
})
// Handler
fs.readdir("./comandos/", (err, files) => {
    if (err) console.error(c.red('[ERRO] - ', err));
  
    let arquivojs = files.filter(f => f.split(".").pop() == "js");
    arquivojs.forEach((f, i) => {
      let props = require(`./comandos/${f}`);
      console.log(c.brightBlue(`[COMANDOS] - ${f} ✓`));
      client.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
// Evento Ready
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
// Boas-Vindas
client.on('guildMemberAdd', member => {
    welcomeChannel.findOne({ GuildID: member.guild.id }, async (err, data) => {
      if(!data) return;
let welcomechanneldata = client.channels.cache.get(data.WelcomeChannelID)
  let join = new Discord.MessageEmbed()
  .setTitle(`${member.guild.name}`)
  .setDescription(`Olá ${member.user} seja bem-vindo ao servidor\n Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
  .setColor('#ff00c2')
 welcomechanneldata.send(join)
    })
})
// Autorole
client.on('guildMemberAdd', async member => {
    autorole.findOne({ GuildID: member.guild.id }, async (err, data432) => {
      if(!data432) return;
      let autorolerole = member.guild.roles.cache.get(data432.RoleID)
      member.roles.add(autorolerole)
    })
  })
  // Carinha LEGAL
  client.on("guildMemberAdd", async (member) => { 

    let guild = await client.guilds.cache.get("714930300924461057");
    let channel = await client.channels.cache.get("755277456969302057");
    let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
    if (guild != member.guild) {
      return
     } else {
      channel.send(`<a:welcome:755429019230404618>  Olá ${member.user} Bem-Vindo(a) a **${guild.name}** Passa em <#755277453408337981> para obter tags <a:hypegato:755445409157218484>`).then(msg=> {
      msg.delete({ timeout: 30000 });
      })
    }
  });
    // Logs de Mensagem
    client.on('messageUpdate', async (oldMessage, newMessage) => {
    logChannel.findOne({ GuildID: oldMessage.guild.id }, async (err, data53) => {
    if(!data53) return;
    if(newMessage.author.bot) return;
    let messageChannel2 = client.channels.cache.get(data53.MessageLogChannel)
    let messageUpdateEmbed = new Discord.MessageEmbed()
    .setAuthor('Mensagem Editada', 'https://media.discordapp.net/attachments/506838906872922145/603643138854354944/messageupdate.png')
    .setDescription(`**Usuário**\: <@${oldMessage.author.id}>
    **Canal**\: <#${oldMessage.channel.id}>`)
    .addField('Antes\:', `${oldMessage.content}`)
    .addField('Depois\:', `${newMessage.content}`)
    .setColor('YELLOW')
    .setFooter(`ID da mensagem\: ${newMessage.id}`)
    .setTimestamp(newMessage.editedTimestamp)
    messageChannel2.send(messageUpdateEmbed)
    });
  });

// Log de Servidor
const adicionada = new Discord.WebhookClient(config.logID, config.logToken)
client.on("guildCreate", guild => {
  let embed = new Discord.MessageEmbed()
  .setTitle(`Fui adicionada em um servidor!`)
  .setDescription(`Membros: ${guild.memberCount} membros\nDono: ${guild.owner}\nID: ${guild.owner.id}\nServidor: ${guild.name}`)
  .setThumbnail(client.user.displayAvatarURL())
  .setTimestamp()
  .setColor('RANDOM')
  adicionada.send(embed);
  guild.owner.send(`Olá, ${guild.owner}\n\nNão sei se foi você ou outra pessoa que me adicionou no servidor **${guild.name}**, mas já que você é o dono eu acho que seria uma boa ideia falar um pouco sobre mim.\n\nEu me chamo **Star:tm:** e sou apenas um simples bot para o Discord! Meu objetivo é deixar o seu servidor mais divertido ??\n\nSe precisar de ajuda ou tenha alguma duvida, entre no meu servidor de suporte: https://discord.gg/Gq2kssT`)
})
// Log de Servidor
const removida = new Discord.WebhookClient(config.logID, config.logToken)
client.on("guildDelete", guild => {
  let embed = new Discord.MessageEmbed()
  .setTitle(`Fui removida de um servidor!`)
  .setDescription(`Membros: ${guild.memberCount} membros\nDono: ${guild.owner}\nID: ${guild.owner.id}\nServidor: ${guild.name}`)
  .setThumbnail(client.user.displayAvatarURL())
  .setTimestamp()
  .setColor('RANDOM')
  removida.send(embed);
});

client.on("guildMemberAdd", async member => {
  const timeAccount = moment(new Date()).diff(member.user.createdAt, "days");
  const minimumDays = 30;

  if (timeAccount < minimumDays) {
    await member.kick();
  }
});

  // Logs de Mensagem
client.on('messageDelete', async (message) => {
    logChannel.findOne({ GuildID: message.guild.id }, async (err, data12) => {
    if(!data12) return;
    if(message.author.bot) return;
    let messageChannel = client.channels.cache.get(data12.MessageLogChannel)
    let messageDeleteEmbed = new Discord.MessageEmbed()
    .setAuthor('Mensagem Deletada', 'https://media.discordapp.net/attachments/506838906872922145/603642595419357190/messagedelete.png')
    .setDescription(`**Usuário**\: <@${message.author.id}>
    **Canal**\: <#${message.channel.id}>
    ${message.content}`)
    .setColor('RED')
    .setFooter(`ID da mensagem\: ${message.id}`)
    .setTimestamp()
    messageChannel.send(messageDeleteEmbed)
    });
  });

//Console
client.on('error', e => {
  console.log(c.red(`${e}`));
})

client.login(config.token)