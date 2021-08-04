const fs = require('fs')

global.premium.events.clear()

fs.readdir('./src/containers/premium/events/', (erro, eventos) => {
  eventos.forEach(async evento => {
    delete require.cache[evento]

    const ArquivoEvento = require(`../../events/${evento}`)
    const Evento = evento.replace('.js', '')
    const event = new ArquivoEvento(global.premium, ArquivoEvento.nome)
    await global.premium.events.set(event.nome, event)
    global.premium[event.type || 'on'](event.nome, async (...args) => event.run(...args))
    console.log(`[EVENTOS] Evento ${Evento} carregado usando os argumentos (${event.nome}).`.brightBlue)
  })
})
