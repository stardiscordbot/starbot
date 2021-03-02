const config = require("../src/config/json/config.json")
module.exports = async (client) => {
	const { Database } = require('quickmongo');
  try {
    client.db = new Database(config.database.mongo.url);
    client.db.on('ready', () => {
		  console.log('[DATABASE] Database ligada com sucesso.'.brightYellow);
	  });
  } catch(e) {
    console.log('[DATABASE] Falha ao se conectar'.red)
  }
};