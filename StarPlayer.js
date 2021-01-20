const Discord = require('discord.js')
const {client} = require('./bot.js')
const cor = require('./src/jsons/cores.json')

client.player.on('trackStart', (message, track) => 
    message.channel.send(`**<:tocando:800749670841581589> Tocando Agora:** \`${track.title}\``)
)

client.player.on('trackAdd', (message, queue, track) => 
message.channel.send(`**<:adicionado:800749879005413376> Foi Adicionado a fila:** \`${track.title}\``)
)

client.player.on('playlistAdd', (message, queue, playlist) => 
message.channel.send(`**<:adicionado:800749879005413376> Foi Adicionado a fila:** \`${playlist.title} (${playlist.tracks.length} músicas)\``)
)

client.player.on('searchResults', (message, query, tracks) => {

    const embed = new Discord.MessageEmbed()
    .setTitle(`<:aviso:800750508289687582> | Selecione uma Música!`)
    .setDescription(tracks.map((t, i) => `**${i} • **\`${t.title}\``))
    .setFooter('Selecione uma música ou digite: cancelar para cancelar a seleção', client.user.displayAvatarURL({dynamic:true}))
    .setColor(cor.rosa)
    message.quote(embed);

})

client.player.on('searchInvalidResponse', (message, query, tracks, content, collector) => {

    if (content === 'cancelar') {
        collector.stop()
        return message.channel.send('**<:cancelar:800754884160782376> Pesquisa:** \`Cancelada com Sucesso\`')
    }

    message.channel.send(`**<:cancelar:800754884160782376> Erro:** \`Escolha um número de 1/${tracks.length}\``)

})

client.player.on('searchCancel', (message, query, tracks) => 
message.quote('**<:cancelar:800754884160782376> Pesquisa:** Você não inseriu uma resposta válida, use o comando novamente!')
)

client.player.on('noResults', (message, query) => 
message.quote(`**<:cancelar:800754884160782376> Pesquisa:** Não achei resultados para: \`${query}\``)
)

client.player.on('queueEnd', (message, queue) => 
message.channel.send('<:aviso:800750508289687582> A Música acabou pois não tenho mais nada na fila!')
)

client.player.on('channelEmpty', (message, queue) => 
message.channel.send('<:aviso:800750508289687582> A Música parou pois todos sairam do canal!')
)

client.player.on('botDisconnect', (message) => 
message.channel.send('<:aviso:800750508289687582> A Música parou pois fui desconectada do canal!')
)

client.player.on('error', (error, message) => {
    switch(error){
        case 'NotPlaying':
            message.quote('**<:cancelar:800754884160782376> Erro:** \`Não estou tocando nada neste servidor\`')
            break;
        case 'NotConnected':
            message.quote('**<:cancelar:800754884160782376> Erro:** \`Você não está conectado em meu canal de voz\`')
            break;
        case 'UnableToJoin':
            message.quote('**<:cancelar:800754884160782376> Erro:** \`Não consigo entrar neste canal, cheque minhas permissões\`')
            break;
        case 'LiveVideo':
            message.quote('**<:cancelar:800754884160782376> Erro:** \`Lives do youtube não são suportadas\`')
            break;
        default:
            message.quote(`**<:cancelar:800754884160782376> Erro:** Ocorreu um erro:\n\`\`\`js\n${error}\n\`\`\``)
    }
})

console.log('[PLAYER] - Carregado Com Sucesso'.magenta)