module.exports = class RoleallCommand {
  constructor(){
    return {
      permissoes: {
        membro: ['MANAGE_ROLES'], //Permissoes que o usuario necessita
        bot: ['MANAGE_ROLES'], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'roleall',
        categoria: '🔨 • Moderação',
        desc: 'Descrição'
      },
      en: {
        nome: 'roleall',
        categoria: '🔨 • Moderation',
        desc: 'Description'
      },
    aliases: ['role', 'allroles'],
    run: this.run
    }
  }
  
  async run(client, message, args, prefixo, idioma) {
    const cargo = message.mentions.roles.first()
    const msg = message;
    if(!args[0]||!cargo) return message.quote(`:x: ${msg.author} **|** Para dar um cargo à todos os membros, utilize \`${prefixo}roleall <@cargo> [humanos/bots/todos]\`\nNão inclua <, >, [ ou ].`)
    let sucesso = 0
    let possuem = 0
    let erros = 0
    msg.quote('ok comecando')
    let membros = await msg.guild.members.fetch()
    const tempo = Date.now()
    if(!args[1]) { args[1] = 'humanos';}
   switch(args[1]){
     case 'bots':
       membros = membros.filter(u=>u.user.bot==true)
       for(var membro of membros.values()){
         if(!membro.roles.cache.has(cargo.id)) {
         if(membro.manageable){
         await membro.roles.add(cargo.id, `RoleAll • Bots • ${msg.author.tag}`).then(()=>{
           sucesso++
         }).catch((e)=>{
      //     console.log(e)
           erros++
         })
         } else {
           erros++
         }
         } else {
           possuem++
         }
       }
       setTimeout(()=>{
         msg.quote(`:white_check_mark: ${msg.author} **|** Acabei!\n- ${sucesso} bots receberam o cargo.\n- ${erros} bots não receberam o cargo pois não posso gerenciar o cargo deles.\n- ${possuem} bots já possuiam o cargo.\n\n- Tempo decorrido: \`${require('pretty-ms')(Date.now()-tempo)}\`\n[Bots totais: ${membros.size}]`)
       }, 1000)
       break;
       case 'humanos':
       membros = membros.filter(u=>u.user.bot==false)
       for(var membro of membros.values()){
         if(!membro.roles.cache.has(cargo.id)) {
         if(membro.manageable){
         await membro.roles.add(cargo.id, `RoleAll • Humanos • ${msg.author.tag}`).then(()=>{
           sucesso++
         }).catch((e)=>{
      //     console.log(e)
           erros++
         })
         } else {
           erros++
         }
         } else {
           possuem++
         }
       }
       setTimeout(()=>{
         msg.quote(`:white_check_mark: ${msg.author} **|** Acabei!\n- ${sucesso} humanos receberam o cargo.\n- ${erros} humanos não receberam o cargo pois não posso gerenciar o cargo deles.\n- ${possuem} humanos já possuiam o cargo.\n\n- Tempo decorrido: \`${require('pretty-ms')(Date.now()-tempo)}\`\n[Humanos totais: ${membros.size}]`)
       }, 1000)
       break;
       default:
       msg.quote(`conheço nn`) //aff davi
       break;
   }
  }
}

// Davi