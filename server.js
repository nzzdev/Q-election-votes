const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
	port: 3002
});

module.exports = server;