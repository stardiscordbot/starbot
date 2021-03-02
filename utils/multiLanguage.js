module.exports = (client) => {
  client.lang = {}
  client.lang.pt = JSON.parse(require('fs').readFileSync('./src/languages/pt.json'))
  client.lang.en = JSON.parse(require('fs').readFileSync('./src/languages/en.json'))
}