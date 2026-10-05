# BloodLink AI — Full Stack

## Run in VS Code
1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Open Terminal.
4. Run:
   cd backend
   npm install
   copy .env.example .env
   npm run dev
5. Open: http://localhost:5000
6. Login:
   Email: admin@bloodlink.ai
   Password: admin123

## MongoDB (optional)
The project works in DEMO_MODE without MongoDB. For database mode, put a MongoDB/MongoDB Atlas URI in backend/.env and set DEMO_MODE=false. Models are included for users, inventory, donors, hospitals and transfers.

## APIs
POST /api/auth/login
POST /api/auth/register
GET /api/inventory
POST /api/inventory
GET /api/donors
GET /api/donors/match/:group
GET /api/hospitals
POST /api/predictions
GET /api/transfers
POST /api/transfers
GET /api/health

## Note
Prediction values are a hackathon demo/rule-based engine, not a clinically validated medical prediction system.
