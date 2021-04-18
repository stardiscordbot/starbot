let texto = msg.content
if (texto.includes(":")) {
    for (var emoji of client.emojis.cache.values()) {
        var regex = new RegExp(`:${emoji.name}:`, 'g')
        if (texto.includes(`:${emoji.name}:`)) texto = texto.replace(regex, emoji.toString())
    }
    if(texto!=msg.content) msg.channel.send(texto)
}