const fs = require('fs')
const {client} = require('../bot.js')

function load(dir){

    fs.readdir(dir, (err, files) => {

    if(err) console.log(err);
    
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Could not find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        delete require.cache[require.resolve(`${dir}${f}`)];
        let props = require(`${dir}${f}`);
        console.log(`${f} loaded yay!`);
        client.commands.set(props.help.name, props);
        client.commands.set(props.help.aliases, props);
    });
});
}
module.exports = {load}