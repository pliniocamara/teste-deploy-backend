const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb+srv://dc-plinio:U2RIDvACQGcxj3xu@cluster0.xlqtmou.mongodb.net/node_mongo');
}

main().catch(err => console.log(err));

module.exports = mongoose.connection;