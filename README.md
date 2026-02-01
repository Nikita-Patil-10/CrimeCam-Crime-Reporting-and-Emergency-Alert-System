# CrimeCam Backend (Express + MongoDB)

Backend API for **CrimeCam – Crime Reporting & Emergency Alert System**.

## 🚀 Quick Start

1) Install dependencies
```bash
npm install
```

2) Copy `.env.example` to `.env` and fill values
```bash
cp .env.example .env
```

3) Start server
```bash
npm run dev
# or
npm start
```

The API will run at `http://localhost:5000`.

## 🔧 Environment Variables
- `MONGO_URI` – MongoDB connection string (Atlas recommended)
- `JWT_SECRET` – any random secret string
- `PORT` – optional, default 5000

## 📦 API Routes

### Auth
- `POST /api/auth/signup` – { name, email, password, role? }
- `POST /api/auth/login` – { email, password } → returns JWT token

### Reports
- `POST /api/reports/add` – { title, description, mediaUrl?, location?, coords?, anonymous? }
- `GET /api/reports/` – **Protected (police/admin)** → pass header: `Authorization: Bearer <token>`

## 🔒 Notes
- Use the JWT from `/login` for protected endpoints.
- Media upload can be integrated via Cloudinary or Firebase; currently expects a `mediaUrl` string.

## 🧭 Next Steps
- Add Cloudinary upload endpoint (`multer` + cloudinary SDK).
- Add SOS websocket channel (Socket.IO) for live alerts & tracking.
- Build police/admin dashboard to view & verify reports.
