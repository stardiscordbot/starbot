module.exports = (client) => {
    const fetch = require('node-fetch');

    client.getText = async function(tex) {
    const res = await fetch(encodeURI(`https://api.ocr.space/parse/imageurl?apikey=helloworld&url=${tex}`));
    const json = await res.json()
    const ocr = json.ParsedResults["ParsedText"]
    return ocr
    }
}