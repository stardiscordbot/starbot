const { ReactionRoleManager } = require('discord.js-collector')
const config = require("../src/config/json/config.json")

module.exports = (client) => {
    client.rr = new ReactionRoleManager(client, {
        storage: true, // Enable reaction role store in a Json file
        mongoDbLink: config.database.mongo.url // See here to see how setup mongoose: https://github.com/IDjinn/Discord.js-Collector/blob/master/examples/reaction-role-manager/Note.md
    });

    client.rr.on('reactionRoleAdd', (member, role) => {
        console.log(member.displayName + ' won the role' + role.name)
    });
    
    // When user remove reaction and lose role, will trigger this event
    client.rr.on('reactionRoleRemove', (member, role) => {
        console.log(member.displayName + ' lose the role' + role.name)
    });
    
    // When someone removed all reactions from message
    client.rr.on('allReactionsRemove', (message) => {
        console.log(`All reactions from message ${message.id} was removed, all roles was taken and reactions roles deleted.`)
    });
    
    // If member doesn't have all requirements, this event is triggered.
    client.rr.on('missingRequirements', (type, member, reactionRole) => {
        console.log(`Member '${member.id}' will not win role '${reactionRole.role}', because him hasn't requirement ${type}`);
    });
    
    // Triggered when the bot doesn't have permissions to manage this role.
    client.rr.on('missingPermissions', (action, member, roles, reactionRole) => {
        console.log(`Some roles cannot be ${action === 1 ? 'given' : 'taken'} to member \`${member.displayName}\`, because i don't have permissions to manage these roles: ${roles.map(role => `\`${role.name}\``).join(',')}`);
    });
}