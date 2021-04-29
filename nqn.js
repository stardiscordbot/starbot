module.exports = async (client, message) => {
    let texto = message.content;
    if (texto.includes('<:') && texto.includes(':>')) return;
    let wh = message.channel.fetchWebhooks();
    
    if (!wh) {
     wh = message.channel.createWebhook(`Nitro | ${client.user.username}`);
    } 
    if(wh) {
      wh = wh.first()
    }

    if (texto.includes(':')) {
        for (var emoji of client.emojis.cache.values()) {
            if (texto.includes(`:${emoji.name}:`)) {
                var regex = new RegExp(`:${emoji.name}:`, 'g');
                texto = texto.replace(regex, emoji.toString());
            }
        }
    }
    if (texto !== message.content) {
        message.delete()
        await wh.send(texto, {
            username: message.author.username,
            avatarURL: message.author.displayAvatarURL(),
        });
    }
}