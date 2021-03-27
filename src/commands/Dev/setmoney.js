module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'setmoney',
          categoria: '💻 • Developer',
          desc: 'Descrição'
        },
        en: {
          nome: 'setmoney',
          categoria: '💻 • Developer',
          desc: 'Description'
        },
      aliases: ['removemoney', 'addmoney'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
        const economy = require("../../config/database/mongodb/economy");

        if(!args[0]) return message.quote(`Escolha entre \`adicionar\` e \`remover\``)

        if(args[0].toLowerCase() == "adicionar") {
            if(!args[1]) return message.quote(`dê o id de um membro`)
            if(!args[2]) return message.quote(`não se esqueça da quantidade`)

            let user = await client.users.fetch(args[1]);
            let quantia = Number(args[2]);

            economy.findOne({ User: user.id }, async(err, data)=> {
                if(!data) {
                    let newEconomy = new economy({
                        User: user.id,
                        Money: amount,
                        Bank: 0,
                        Tag: message.author.tag,
                        DailyTime: Date.now()
                    })
                    newEconomy.save();
                    message.react("✔️")
                }
                if(data) {
                    data.Money = data.Money + quantia;
                    data.save()
                    message.react("✔️")
                }
            })
        }

        if(args[0].toLowerCase() == "remover") {
            if(!args[1]) return message.quote(`dê o id de um membro`)
            if(!args[2]) return message.quote(`não se esqueça da quantidade`)

            let user = await client.users.fetch(args[1]);
            let quantia = Number(args[2]);

            economy.findOne({ User: user.id }, async(err, data)=> {
                if(!data) {
                    let newEconomy = new economy({
                        User: user.id,
                        Money: amount,
                        Bank: 0,
                        Tag: message.author.tag,
                        DailyTime: Date.now()
                    })
                    newEconomy.save();
                    message.react("✔️")
                }
                if(data) {
                    data.Money = eval(data.Money - quantia)
                    data.save()
                    message.react("✔️")
                }
            })
    }
    
    }
  }
  
  //Nome de quem fez ou ajudou