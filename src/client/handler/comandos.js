const fs = require('fs');

// Apagar comandos e aliases existentes (reload).
star.commands.clear();
star.aliases.clear();
// Carregar categorias.
fs.readdir('./src/commands/', (err, cat) => {
    cat.forEach(categoria => {
        console.log(`[CATEGORIAS] Carregando categoria ${categoria}`.brightCyan);

        // Carregar comandos de tal categoria.
        fs.readdir(`./src/commands/${categoria}`, (err, cmds) => {
            cmds.forEach(cmd => {
                try {
                    const cmdObj = require(`../../commands/${categoria}/${cmd}`);
                    const comando = new cmdObj();
                    const nome = comando.pt.nome;
                    const nome2 = comando.en.nome;
                    // Definir comando no client.
                    star.commands.set(nome, comando);
                    star.commands.set(nome2, comando);

                    if (comando.aliases) {
                        comando.aliases.map(alia => {
                            star.aliases.set(alia, comando)
                        })
                    }

                    delete require.cache[cmd];

                    // Caso tenha carregado corretamente informar!
                    console.log(`[COMANDOS] Comando ${nome} carregado com sucesso.`.brightGreen);
                } catch (erro) {
                    const cmdObj = require(`../../commands/${categoria}/${cmd}`);
                    const comando = new cmdObj();
                    const nome = comando.pt.nome;
                    // Caso tenha dado algum erro ao carregar informar!
                    console.log(`[COMANDOS] Comando ${nome} não pode ser carregado :(\n\nErro: ${erro}`.bgRed);
                }
            })
        })
    })
})

// Davi e LRD fez.