//This file connects the browser to the server, handles speech recognition (input), and speech synthesis (output).

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // This sets up speech recognition in the browser.
const socket = io();
const recognition = new SpeechRecognition(); // It uses webkitSpeechRecognition for Chrome support.

recognition.lang = 'en-US';                 // sets language to English (US)
recognition.interimResults = false;         // interimResults = false means you'll only get the final result, not live/partial ones

document.querySelector('button').addEventListener('click', () => {          // When the user clicks the button, speech recognition starts listening
    recognition.start();
  });

recognition.addEventListener('result', (e) => {         // when speech is recongnised
  let last = e.results.length - 1;                      // gets the most recent result
  let text = e.results[last][0].transcript;             // Extracts the transcript (recognised text)

  console.log('Confidence: ' + e.results[0][0].confidence);     // Logs the confidence score

  socket.emit('chat message', text);
});

function synthVoice(text) {
    const synth = window.speechSynthesis;               // Converts text into spoken audio
    const utterance = new SpeechSynthesisUtterance();   // uses browser's built in speech synthesis engine
    utterance.text = text;
    synth.speak(utterance);
}

socket.on('bot reply', function(replyText) {            
    synthVoice(replyText);                              // Once it gets the reply from Dialogflow, it speaks it out loud using synthVoice
});
  
