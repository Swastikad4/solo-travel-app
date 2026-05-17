# SoloTravel 🌍

> A full-stack solo travel companion app — discover destinations, plan trips, and connect with fellow solo travelers via real-time chat.

[![Deploy Backend on Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

---

## ✨ Features

- 🗺️ **Destination Explorer** — Browse 6+ curated destinations with safety ratings, budgets, best travel times, and things to do
- ✈️ **Trip Planner** — Publish your upcoming trip and appear on destination pages so other travelers can find you
- 💬 **Traveler Chat** — Message fellow solo travelers planning to visit the same destination
- 📱 **Fully Responsive** — Mobile-first design with a luxury dark-mode aesthetic
- 🔒 **Production-grade Security** — Helmet, rate limiting, input validation, and CORS control

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router 7, Axios, Vanilla CSS |
| Backend | Node.js, Express 5, Mongoose |
| Database | MongoDB Atlas (with in-memory fallback) |
| Deployment | Render (backend) + Vercel (frontend) |

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- npm 9+
- A MongoDB Atlas account (free tier works) — or the app will use built-in sample data

### 1. Clone the repo
```bash
git clone https://github.com/Swastikad4/solo-travel-app.git
cd solo-travel-app
```

### 2. Setup the Backend
```bash
cd backend
cp .env.example .env
# Edit .env and add your MONGO_URI
npm install
npm run dev        # starts on http://localhost:5000
```

### 3. Setup the Frontend
```bash
cd frontend
# .env is already configured for local dev (points to localhost:5000)
npm install
npm start          # starts on http://localhost:3000
```

Both servers must be running at the same time. Open **http://localhost:3000** in your browser.

---

## ☁️ Deployment

### Backend → Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo and set **Root Directory** to `backend`
4. Use these settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node
5. Add environment variables in the Render dashboard:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `ALLOWED_ORIGINS` | Your Vercel frontend URL (e.g. `https://solotravel.vercel.app`) |

6. Note your backend URL — e.g. `https://solotravel-api.onrender.com`

---

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo and set **Root Directory** to `frontend`
3. Use these settings:
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Add environment variables in the Vercel dashboard:

| Variable | Value |
|----------|-------|
| `REACT_APP_API_URL` | Your Render backend URL (e.g. `https://solotravel-api.onrender.com`) |

5. Deploy! Your app will be live at `https://your-project.vercel.app`

---

## 📁 Project Structure

```
solo-travel-app/
├── backend/
│   ├── data/
│   │   └── sampleData.js      # Fallback data when MongoDB is offline
│   ├── models/
│   │   ├── Destination.js
│   │   ├── Message.js
│   │   ├── Trip.js
│   │   └── User.js
│   ├── routes/
│   │   ├── chatRoutes.js      # GET/POST messages with validation
│   │   ├── destinationRoutes.js
│   │   └── tripRoutes.js      # POST/GET trips with validation
│   ├── .env.example           # Template — copy to .env
│   ├── .gitignore
│   ├── render.yaml            # Render deployment config
│   └── server.js              # Express app with security middleware
│
└── frontend/
    ├── public/
    │   └── index.html         # SEO meta tags, Open Graph
    ├── src/
    │   ├── pages/
    │   │   ├── Home.js        # Hero, search, destination grid
    │   │   ├── Destination.js # Detail view + traveler chat
    │   │   ├── PlanTrip.js    # Trip publishing form
    │   │   └── NotFound.js    # 404 page
    │   ├── App.css            # Complete design system
    │   └── App.js             # Router with all routes
    ├── .env                   # Local dev (localhost:5000)
    ├── .env.example           # Template for other devs
    ├── .env.production        # Production template (fill in Render URL)
    └── vercel.json            # SPA routing fix for Vercel
```

---

## 🔒 Security Features

- **Helmet** — Sets secure HTTP headers
- **Rate Limiting** — 100 requests / 15 min per IP on all `/api/*` routes
- **CORS** — Restricted to allowed origins in production
- **Input Validation** — All POST endpoints validate and sanitize input
- **Payload Limit** — JSON body capped at 10kb
- **No secrets in git** — `.env` is gitignored; use `.env.example` as template

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check (returns status + MongoDB connection) |
| `GET` | `/api/destinations` | List all destinations |
| `GET` | `/api/destinations/:name` | Get destination details by name |
| `GET` | `/api/trips` | List all published trips |
| `GET` | `/api/trips/:destination` | Get trips for a specific destination |
| `POST` | `/api/trips/add` | Publish a new trip |
| `GET` | `/api/chat/:user1/:user2` | Get conversation between two users |
| `POST` | `/api/chat/send` | Send a new message |

---

## 📄 License

MIT © 2026 SoloTravel
