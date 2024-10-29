const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const sessionStore = new MongoDBStore(
{
    uri: 'mongodb://localhost:27017/',
    databaseName: 'test',
    collection: 'sessions' //Poderia usar essas dados no redis
})

module.exports = sessionStore