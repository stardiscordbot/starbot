const fs = require('fs')

// Apagar comandos e aliases existentes (reload).
global.premium.commands.clear()
global.premium.aliases.clear()
// Carregar categorias.
fs.readdir('./src/commands/', (err, cat) => {
  if (err) throw err
  cat.forEach(categoria => {
    console.log(`[CATEGORIAS] Carregando categoria ${categoria}`.brightCyan)

    // Carregar comandos de tal categoria.
    fs.readdir(`./src/commands/${categoria}`, (err, cmds) => {
      if (err) throw err
      cmds.forEach(cmd => {
        try {
          const CmdObj = require(`../../commands/${categoria}/${cmd}`)
          const comando = new CmdObj()
          const nome = comando.pt.nome
          const nome2 = comando.en.nome
          // Definir comando no client.
          global.premium.commands.set(nome, comando)
          global.premium.commands.set(nome2, comando)

          if (comando.aliases) {
            comando.aliases.forEach(alia => {
              global.premium.aliases.set(alia, comando)
            })
          }

          delete require.cache[cmd]

          // Caso tenha carregado corretamente informar!
          console.log(`[COMANDOS] Comando ${nome} carregado com sucesso.`.brightGreen)
        } catch (erro) {
          const CmdObj = require(`../../commands/${categoria}/${cmd}`)
          const comando = new CmdObj()
          const nome = comando.pt.nome
          // Caso tenha dado algum erro ao carregar informar!
          console.log(`[COMANDOS] Comando ${nome} não pode ser carregado :(\n\nErro: ${erro}`.bgRed)
        }
      })
    })
  })
})

// Davi e LRD fez.
