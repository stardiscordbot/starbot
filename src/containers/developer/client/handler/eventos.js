const fs = require('fs')

global.dev.events.clear()

fs.readdir('./src/events/', (erro, eventos) => {
  eventos.forEach(async evento => {
    delete require.cache[evento]

    const ArquivoEvento = require(`../../events/${evento}`)
    const Evento = evento.replace('.js', '')
    const event = new ArquivoEvento(global.dev, ArquivoEvento.nome)
    await global.dev.events.set(event.nome, event)
    global.dev[event.type || 'on'](event.nome, async (...args) => event.run(...args))
    console.log(`[EVENTOS] Evento ${Evento} carregado usando os argumentos (${event.nome}).`.brightBlue)
  })
})
