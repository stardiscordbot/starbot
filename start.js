const { exec } = require("child_process")

exec('npm start', (err, out) => {
console.log(out || err)
})
// "start": "node --expose-gc --optimize_for_size --gc_interval=100 bot.js"