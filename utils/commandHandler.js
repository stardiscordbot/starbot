module.exports = (client) => {
  
  const fs = require('fs')
  require('colors')
  
  //Apagar comandos existentes (reload)
  client.commands.clear()
  
  //Carregar categorias
  fs.readdir('./src/commands/', (err, cat) => {
    cat.forEach(categoria => {
      console.log(`[CATEGORIAS] Carregando categoria ${categoria}`.brightMagenta)
      
      //Carregar comandos de tal categoria
      fs.readdir(`./src/commands/${categoria}`, (err, cmds) => {
        cmds.forEach(cmd=>{
        const cmdFormatted = cmd.replace('.js', '')
        const cmdObj = require(`../src/commands/${categoria}/${cmdFormatted}`)
        const comando = new cmdObj()
        
        //Definir comandos na memória
        client.commands.set(cmdFormatted, comando)
        
        //Notificar carregamento
        console.log(`[COMANDOS] Comando ${cmdFormatted} carregado com sucesso.`.brightGreen)
        })
      })
    })
  })
  
}
// Davi fez.
