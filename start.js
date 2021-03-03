const { exec } = require("child_process")

exec('npm start', (err, out) => {
console.log(out || err)
})