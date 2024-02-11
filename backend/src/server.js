const http = require('http');
const os = require('os');

const app = require('./app');
const port = process.env.PORT || 5002; // DEV
const server = http.createServer(app);

const networkInterfaces = os.networkInterfaces();
const addresses = [];

for (const [interfaceName, interfaceDetails] of Object.entries(networkInterfaces)) {
  for (const iface of interfaceDetails) {
    if (iface.family === 'IPv4' && !iface.internal) {
      addresses.push(iface.address);
    }
  }
}

console.log('NodeJS application IP: ', addresses);

server.listen(port, () => console.log(`Server has started on port ${port}`));
