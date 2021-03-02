module.exports = (client) => {
  const fs = require('fs')
  fs.readdir('./src/events', (erro, eventos) => {
    eventos.forEach(evento=>{
      evento = evento.replace('.js', '')
      require(`../src/events/${evento}`)(client)
      console.log(`[EVENTOS] ${evento} carregado com sucesso.`.brightBlue)
    })
  })
}
/*Davi refez, tava dando erro no filtro.
E tambem estava procurando eventos na pasta src, que nem existe...*/