module.exports = class guildMemberAdd {
    constructor() {
        return {
            nome: 'guildMemberAdd',
            run: this.run
        }
    }
    async run(member) {
        const autorolebot = await db.get(`autorolebot-${member.guild.id}`)
        const autoroleuser = await db.get(`autoroleuser-${member.guild.id}`)
        if(member.bot) {
            return autorolebot.map(async (role) => {
                member.addRole(role, 'AutoRole - Bot')
            })
        } else {
            return autoroleuser.map(async (role) => {
                member.addRole(role, 'AutoRole - User')
            }) 
        }
    }
}