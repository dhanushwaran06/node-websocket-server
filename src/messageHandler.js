const { broadcast } = require('./clientManager');

function handleMessage(data, ws, id) {
  switch (data.type) {
    case 'chat':
      console.log(`Client ${id} says: ${data.message}`);
      broadcast({ type: 'chat', id, message: data.message });
      break;
    case 'ping':
      ws.send(JSON.stringify({ type: 'pong', message: 'Pong!' }));
      break;
    default:
      console.error(`Unknown message type from Client ${id}:`, data.type);
  }
}

module.exports = { handleMessage };
