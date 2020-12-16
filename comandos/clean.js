const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
  const motivo = `Comando Executado por: ${message.author.tag} (${message.author.id})`
  if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
    return message.quote(`<a:nao:753735889783357560> ${message.author}, Eu não tenho permissão para executar este comando!`)
  }
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.quote(`<a:nao:753735889783357560> ${message.author}, Você não tenho permissão para executar este comando!`);
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.quote(`<a:nao:753735889783357560> ${message.author}, Escolha um número de 2 a 100 mensagens para serem limpas.`);

  const fetched = await message.channel.messages.fetch({ limit: deleteCount });
  message.channel.bulkDelete(fetched, {reason: motivo});
  message.quote(`<a:sim:754692730546028615> ${args[0]} mensagens limpas com sucesso!`).then(msg => msg.delete({timeout: 5000}))
    .catch(error =>
      message.quote(`<a:nao:753735889783357560> ${message.author}, Não foi possível deletar mensagens devido a: \`${error}\``)
    );
};
exports.help = {
    name: 'clean',
    aliases: ['clear', 'limpar'],
    status: 'on'
}