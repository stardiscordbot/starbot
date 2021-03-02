# Verificador de Votos Zuraaa!

Desenvolvido por: *Rangel#3644*\
Agradecimentos: *Acnologia#8486*\
Baseado na biblioteca desenvolvida por: *GM#3078*

### Pra que serve?
Esta biblioteca tem o objetivo de identificar __em tempo real__ quando seu bot recebe um voto na botlist [Zuraaa!](https://zuraaa.com/) e obter os dados do usuário que fez o voto, para enviar uma mensagem de agradecimento ou recompensa. Esta versão não precisa de APIs nem de Webhooks, porém **requer que o usuário que votou esteja pelo menos em um servidor que seu bot também esteja**. Seu bot também precisa estar presente no servidor [Bots Para Discord](https://zuraaa.com/discord)!

### Instalação
Coloque o arquivo `votosZuraaa.js` na pasta raiz do seu bot. **Não o modifique!**

### Exemplo de uso
O exemplo abaixo é referente ao **arquivo principal do seu bot** (geralmente `index.js` ou `bot.js`):

```js
// Iniciando módulo do Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Inicializando biblioteca
const votosZuraaa = require('./votosZuraaa.js');

// Evento de mensagens do bot
client.on('message', message => {
    votosZuraaa.verificaVotos(message, (user) => {
        // Modifique este bloco de acordo com a função que você deseja
        user.send('Obrigado por votar em mim!');
    });
}

// Login do Discord
client.login('TOKEN');
```

#### Mensagem de agradecimento / recompensa
Dentro da função especificada no parâmetro `callback` você deve definir o que o bot fará com o usuário que votou. A função retorna o objeto *User* com todos os dados do usuário. No exemplo acima os dados estão armazenados na variável `user`, e o bot envia uma mensagem de agradecimento na DM do usuário. Você pode modificar isso de acordo com sua necessidade.

### Suporte
Dúvidas, sugestões ou problemas abra um Issue no GitHub ou me chame no Discord!\
Se copiar ou modificar, por favor mantenha os créditos.
