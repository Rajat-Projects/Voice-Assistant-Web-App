const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server); // ✅ Initialize Socket.IO
const path = require('path');
const apiai = require('apiai')(APIAI_TOKEN); // Replace APIAI_TOKEN with your key

// Serve static files
app.use(express.static(__dirname + '/views'));  // HTML
app.use(express.static(__dirname + '/public')); // JS, CSS, images

// Route: homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html')); // ✅ full path
});

// Start the server
server.listen(5000, () => {
  console.log("✅ Server is running on http://localhost:5000");
});

// Handle WebSocket connection
io.on('connection', function(socket) {
  console.log('🔌 User connected');

  socket.on('chat message', (text) => {
    console.log('🗣️ User said:', text);

    // Send text to Dialogflow (API.AI)
    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID  // Replace with your session ID string
    });

    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      console.log('🤖 AI replied:', aiText);

      // Send reply to client
      socket.emit('bot reply', aiText);
    });

    apiaiReq.on('error', (error) => {
      console.error('Dialogflow error:', error);
    });

    apiaiReq.end();
  });

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected');
  });
});
