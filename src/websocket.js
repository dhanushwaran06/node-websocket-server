const { clients, broadcast } = require('./clientManager');
const { handleMessage } = require('./messageHandler');

let clientId = 0;

function handleConnection(ws) {
  const id = clientId++;
  clients.set(ws, id);

  console.log(`Client ${id} connected`);

  ws.send(JSON.stringify({ type: 'system', message: `Welcome to the WebSocket server, Client ${id}!` }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      handleMessage(data, ws, id);
    } catch (error) {
      console.error(`Error parsing message from Client ${id}:`, error);
    }
  });

  ws.on('close', () => {
    console.log(`Client ${id} disconnected`);
    clients.delete(ws);
    broadcast({ type: 'system', message: `Client ${id} has left the chat` });
  });
}

module.exports = { handleConnection };
