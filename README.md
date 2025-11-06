🌐 InfoHub Challenge
InfoHub Challenge is a full-stack web application that connects a Node.js + Express backend (Render) with a React + Vite frontend (Vercel).
It demonstrates API integration, clean UI, and a smooth deployment workflow across modern platforms.

📁 Project Structure
InfoHub-Challenge/ │ ├── client/ # Frontend (React + Vite) │ ├── src/ # React components & pages │ ├── public/ index.hrml │ ├── package.json │ └── vite.config.js │ ├── server/ # Backend (Node.js + Express) │ ├── server.js # Entry point │ ├── routes/ │ ├── controllers/ │ ├── package.json │ └── .env.example │ ├── .gitignore ├── render.yaml # Render backend deployment config ├── vercel.json # Vercel frontend deployment config └── InfoHub-Backend.postman_collection.json # API testing collection

yaml Copy code

⚙️ Tech Stack
🖥 Frontend (Client)
React (Vite)
Axios for API requests
Tailwind CSS for styling
Deployed on Vercel
⚙️ Backend (Server)
Node.js + Express.js
Axios, dotenv, cors
Deployed on Render
🧠 Environment Variables
Create .env files in both client and server folders.

Server (server/.env)
PORT=5000 WEATHER_API_KEY=66f70c3969a272ed5f7963f46cb5ebdf

shell Copy code

Client (client/.env)
VITE_API_BASE_URL=https://infohub-server.onrender.com

yaml Copy code

🚀 Installation & Local Setup
1️⃣ Clone the Repository
git clone https://github.com/Rakesh-Gurrala/InfoHub-Challenge-1.git
cd InfoHub-Challenge
2️⃣ Install Dependencies
Client
bash
Copy code
cd client
npm install
Server
bash
Copy code
cd ../server
npm install
▶️ Running Locally
Start Backend
bash
Copy code
cd server
npm start
Backend URL: http://localhost:5000

Start Frontend
bash
Copy code
cd client
npm run dev
Frontend URL: http://localhost:5173

☁️ Deployment Guide
🔹 Step 1: Deploy Backend on Render
Go to https://render.com

Click New + → Blueprint

Connect your GitHub repository

Add the render.yaml file at your repo root:

yaml
Copy code
services:
  - type: web
    name: infohub-server
    env: node
    rootDir: server
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: WEATHER_API_KEY
        value: your_openweathermap_api_key_here
Deploy → wait for the live backend URL
Example: https://infohub-server.onrender.com

🔹 Step 2: Deploy Frontend on Vercel
Go to https://vercel.com

Import your GitHub repository

Select client as the root directory

Set the following:

Framework Preset: Vite

Build Command: npm run build

Output Directory: dist

Click “Add Environment Variable”:

makefile
Copy code
Key: VITE_API_BASE_URL
Value: https://infohub-server.onrender.com
Click Deploy

✅ Your frontend will be live on
https://your-vercel-project-name.vercel.app

🧩 Testing the API
Use the provided Postman collection:

pgsql
Copy code
InfoHub-Backend.postman_collection.json
Import this into Postman and test endpoints such as:

GET /api/weather

GET /api/info

🧾 Scripts Summary
Client (React)
Command	Description
npm run dev	Start local development
npm run build	Build for production
npm run preview	Preview production build

Server (Node)
Command	Description
npm start	Run backend server
npm run dev	Run backend using nodemon

🛠 Troubleshooting
Issue	Cause	Fix
CORS error	Client API base URL mismatch	Ensure correct Render backend URL in .env
API key not working	Missing or invalid OpenWeather key	Check .env variable on Render
Frontend build failed	Missing VITE_API_BASE_URL	Add it in Vercel environment variables
Blank page on Vercel	Wrong output path	Ensure output folder = dist

💡 Learnings
Building a Full Stack App with React + Node

Using Vite for fast builds

Deploying backend with Render

Deploying frontend with Vercel

Environment variable configuration for multi-platform setup

👨‍💻 Author
Rakesh Gurrala
📧 Email: [gurralarakesh2002@gmail.com]
