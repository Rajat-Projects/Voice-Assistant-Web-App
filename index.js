const express = require('express');             // Loads the Express framework, which helps you build a server and handle HTTP routes easily.
const app = express();                          // Creates an instance of an Express application (your server starts here).
const http = require('http');                   // Creates a raw HTTP server using your Express app. You need this to use Socket.IO with Express.
const server = http.createServer(app);          // Initializes Socket.IO, a library that lets you do real-time communication
const io = require('socket.io')(server); // ✅ Initialize Socket.IO
const path = require('path');

require('dotenv').config(); 
const apiai = require('apiai')(process.env.APIAI_TOKEN);
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
   
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
io.on('connection', function(socket) {               // This runs every time a new user connects via Socket.IO (like opening the page).
  console.log('🔌 User connected');

  socket.on('chat message', (text) => {             // Listens for 'chat message' from the frontend (user's spoken text via script.js).
    console.log('🗣️ User said:', text);

    // Send text to Dialogflow (API.AI)
    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID                    // Replace with your session ID string
    });

    apiaiReq.on('response', (response) => {           // When dialogflow replies Extracts the reply text from fulfillment.speech
      let aiText = response.result.fulfillment.speech;
      console.log('🤖 AI replied:', aiText);

      // Send reply to client
      socket.emit('bot reply', aiText);                // Sends the bot’s response back to the frontend (where it will be spoken using speechSynthesis).
    });

    apiaiReq.on('error', (error) => {                  // Handles errors if the Dialogflow request fails, and finishes the request. 
      console.error('Dialogflow error:', error);
    });

    apiaiReq.end();
  });

  socket.on('disconnect', () => {                      // Logs a message when the user disconnects (e.g. closes the tab or refreshes the page).
    console.log('🔌 User disconnected');
  });
});
