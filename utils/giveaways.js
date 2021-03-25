const {GiveawaysManager} = require('discord-giveaways');
const config = require("../src/config/json/config.json")

const { Database } = require('quickmongo');
const db = new Database(config.database.mongo.url);
db.once('ready', async () => {
    if ((await db.get('giveaways')) === null) await db.set('giveaways', []);
});

module.exports = async (client) => {
    class GiveawayManagerWithOwnDatabase extends GiveawaysManager {
        async getAllGiveaways() {
            return await db.get('giveaways');
        }
    
        async saveGiveaway(messageID, giveawayData) {
            await db.push('giveaways', giveawayData);
            return true;
        }
    
        async editGiveaway(messageID, giveawayData) {
            const giveaways = await db.get('giveaways');
            const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
            newGiveawaysArray.push(giveawayData);
            await db.set('giveaways', newGiveawaysArray);
            return true;
        }
    
        async deleteGiveaway(messageID) {
            const data = await db.get('giveaways');
            const newGiveawaysArray = data.filter((giveaway) => giveaway.messageID !== messageID);
            await db.set('giveaways', newGiveawaysArray);
            return true;
        }
    }
    const manager = new GiveawayManagerWithOwnDatabase(client, {
        storage: false, //'./src/config/json/giveaways.json',
        updateCountdownEvery: 10000,
        hasGuildMembersIntent: false,
        default: {
            botsCanWin: false,
            exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
            embedColor: '#b2d8FF',
            embedColorEnd: '#b2d8FF',
            reaction: '🎉'
        }
    });
    // We now have a giveawaysManager property to access the manager everywhere!
    client.giveawaysManager = manager;

}