require('dotenv').config();
const director = require('director');
const Server = require('./lib/Server.js');

// create a router for certain paths
const router = new director.http.Router({
  '/' : {
    post: Server.post,
    get:  Server.ping
  }
});
const server = new Server(router, process.env.PORT);
server.serve();