const http = require('http');
const app = require('./app');

const server = http.createServer(app); 

const port = 3000;
console.log('Starting the server...');
server.listen(port, () => { 
  console.log(`Server running on port ${port}`);
});

