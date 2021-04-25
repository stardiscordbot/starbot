module.exports = class VarporwaveCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'snake',
          categoria: '🤣 • Fun',
          desc: 'Cria um jogo divertidos e interativos baseados no famoso jogo Snake!'
        },
        en: {
          nome: 'snake',
          categoria: '🤣 • Fun',
          desc: 'Create fun and interactive games based on the famous Snake game!'
        },
      aliases: ['snakecord', 'cobra'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
        const SnakeGame = require('../../../utils/snakegame');
        const snakeGame = new SnakeGame({
            title: '🐍 Snake Game',
            color: "GREEN",
            timestamp: false,
            gameOverTitle: "Game Over"
        });
        return snakeGame.newGame(message);
    }
  }
  
  //ADG