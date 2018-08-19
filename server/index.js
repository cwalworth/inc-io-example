const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

const rgb = { r: 0, g: 0, b: 0 };

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.emit('connection', rgb);

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('color', (color, value) => {
    rgb[color] = value;

    io.sockets.emit('update', rgb);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('./build')));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve('./build/index.html'));
  });
}

http.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});
