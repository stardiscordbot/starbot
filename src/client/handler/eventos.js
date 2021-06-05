const fs = require('fs');

star.events.clear();

fs.readdir('./src/events/', (erro, eventos) => {
  eventos.forEach(async evento => {
    delete require.cache[evento];

    const arquivoEvento = require(`../../events/${evento}`);
    const Evento = evento.replace('.js', '');
    const event = new arquivoEvento(star, arquivoEvento.nome);
    await star.events.set(event.nome, event);
    star[event.type || 'on'](event.nome, async (args) => event.run(args));
    console.log(`[EVENTOS] Evento ${Evento} carregado usando os argumentos (${event.nome}).`.brightBlue)
  })
})