#  Voice Assistant Web App

This project is a real-time, browser-based AI voice assistant built with:

- 🎤 Speech Recognition (Web Speech API)  
- 🔁 Socket.IO for real-time communication  
- ⚙️ Express.js for server-side logic  
- 🤖 Dialogflow (API.AI) for natural language understanding  
- 🔊 Speech Synthesis for text-to-speech output  

Users can click a button, speak a command, and hear an AI-powered spoken reply — all in the browser.

---

##  Features

- 🎧 Voice input via the browser's mic  
- 💬 AI-powered replies using Dialogflow intents  
- 🔁 Real-time client-server interaction with Socket.IO  
- 🔊 Text-to-speech responses using Web Speech API  
- 🎨 Clean, animated UI with mic button  

---

## 📁 Project Structure

```
voice-assistant-web-app/
├── index.js               # Express + Socket.IO + Dialogflow backend
├── .env.example           # Sample environment variable file
├── package.json           # Node.js dependencies
├── views/
│   └── index.html         # Frontend HTML
├── public/
│   ├── js/
│   │   └── script.js      # Frontend logic (speech recognition, sockets)
│   └── style.css          # Styling (mic button, layout)
├── images/
│   └── geometry.png       # Background image (optional)
└── README.md              # You're here!
```

---

##  Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/Rajat-Projects/Voice-Assistant-Web-App.git
cd Voice-Assistant-Web-App
```

### 2. Install Dependencies

```
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (you can copy `.env.example`):

```
APIAI_TOKEN=your-dialogflow-client-token
APIAI_SESSION_ID=your-unique-session-id
```

To get your Dialogflow token, see below.

---

##  Configuring Dialogflow (API.AI)

1. Visit https://dialogflow.cloud.google.com/  
2. Sign in with Google and create a new agent  
3. Create intents with training phrases and responses  
4. Go to ⚙️ Settings > General tab  
5. Copy your **Client Access Token**  
6. Paste it into your `.env` file  

>  Dialogflow V1 (Client Access Token) is used for simplicity. For production, use Dialogflow V2 and service accounts.

---

##  Running the Project

Start the server:

```
node index.js
```

Open the app in Google Chrome:

```
http://localhost:5000
```

Click the **Talk** button → Speak → Hear the reply!

---

##  Environment Variables

| Variable          | Required | Description                        |
|------------------|----------|------------------------------------|
| APIAI_TOKEN       | ✅       | Your Dialogflow API token          |
| APIAI_SESSION_ID  | ✅       | Unique session ID for the chat     |

Don’t commit your real `.env` file. It’s ignored by `.gitignore`.  
Use `.env.example` to show others what variables they need.

---

##  Technologies Used

- Node.js  
- Express.js  
- Socket.IO  
- Dialogflow API  
- Web Speech API  
- HTML5, CSS3, JavaScript

---

##  Future Enhancements

- 📝 Chat history display in UI  
- 🌐 Multi-language support  
- 🔁 Continuous conversation mode  
- 🤖 GPT integration  
- 📱 Mobile-friendly layout

---

##  License

MIT License © 2025 [Rajat Pednekar](https://github.com/Rajat-Projects)

---

##  Acknowledgements

- Google Dialogflow  
- Socket.IO  
- Mozilla Web Docs – Web Speech API

