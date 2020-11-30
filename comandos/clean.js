const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const motivo = `Comando Executado por: ${message.author.tag} (${message.author.id})`
  if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
    return message.reply("Eu não tenho a permissão necessária!")
  }
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.reply(
      "você é fraco, lhe falta permissão de `Gerenciar Mensagens` para usar esse comando"
    );
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return message.reply(
      "forneça um número de até **99 mensagens** a serem excluídas"
    );

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  });
  message.channel.bulkDelete(fetched, {reason: motivo});
  message.channel
    .send(`**${args[0]} mensagens limpas nesse chat!**`).then(msg => msg.delete({timeout: 5000}))
    .catch(error =>
      console.log(`Não foi possível deletar mensagens devido a: ${error}`)
    );
};
exports.help = {
    name: 'clean',
    aliases: ['clear', 'limpar'],
    status: 'on'
}