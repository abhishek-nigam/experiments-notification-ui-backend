const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
    const mongo_user = config.get('databases.mongo.user');
    const mongo_password = config.get('databases.mongo.password');
    const mongo_host = config.get('databases.mongo.host');
    const mongo_port = config.get('databases.mongo.port');
    const mongo_name = config.get('databases.mongo.name');

    const mongoConnectionUri = 'mongodb://' + mongo_user + ':' + mongo_password + '@' + mongo_host + ':' + mongo_port + '/' + mongo_name;

    mongoose
        .connect(mongoConnectionUri, { useNewUrlParser: true, useCreateIndex: true })
        .then(() => console.log('[OK] Connected to mongodb'));
}