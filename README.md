Restaurant Admin Dashboard (MERN)

📌 Project Overview

A full‑stack Restaurant Admin Dashboard built with the MERN stack (MongoDB, Express, React, Node.js).
It allows restaurant administrators to manage menu items, track orders, and monitor availability in real time.

✨ Features Implemented
- Menu Management
- Add, edit, delete menu items
- Toggle availability status
- Search and filter menu items
- Orders Management
- View all orders with pagination
- Update order status (Pending → Ready → Delivered → Cancelled)
- View detailed order information in modal
-

 Dashboard
- Overview of menu items and orders
- Responsive design with Tailwind CSS
- Deployment
- Frontend → Netlify
- Backend → Render
- Connected via environment variables

Prerequisites & Installation
Requirements
- Node.js (>= 16)
- MongoDB Atlas account
- GitHub account
- Netlify (for frontend deployment)
- Render (for backend deployment)

- 
Installation Steps
# Clone the repo
git clone https://github.com/dhivya-bj/restaurant-admin-dashboard.git

# Navigate into client (frontend)
cd client
npm install

# Navigate into server (backend)
cd ../server
npm install


Run locally:
# Start backend
npm start

# Start frontend (Vite)
npm run dev

Environment Variables
Create a .env file in both client and server folders.
Client (client/.env)
REACT_APP_API_URL=https://your-backend.onrender.com


Server (server/.env)
MONGODB_URI=your-mongodb-connection-string
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key

API Endpoints
Menu Routes
- GET /api/menu → Fetch all menu items
- POST /api/menu → Add new menu item
- PUT /api/menu/:id → Update menu item
- DELETE /api/menu/:id → Delete menu item
- PATCH /api/menu/:id/availability → Toggle availability
Example Request (POST):
{
  "name": "Margherita Pizza",
  "category": "Main Course",
  "price": 250,
  "available": true
}

Example Response:
{
  "_id": "abc123",
  "name": "Margherita Pizza",
  "category": "Main Course",
  "price": 250,
  "available": true
}

Orders Routes
- GET /api/orders → Fetch all orders
- GET /api/orders/:id → Fetch single order details
- PATCH /api/orders/:id/status → Update order status
Example Request (PATCH):
{
  "status": "Delivered"
}

Example Response:
{
  "_id": "xyz789",
  "customer": "John Doe",
  "status": "Delivered",
  "total": 500,
  "menuItems": [...]
}

Challenges Faced & Solutions

- Issue: Netlify build failed due to missing package.json.
Solution: Set base directory to client and publish directory to dist.
- Issue: Render backend failed with exit code 254.
Solution: Point Render root directory to server and set correct start command (npm start).
- Issue: Refreshing routes broke frontend.
Solution: Added _redirects file in public/ with /* /index.html 200.


Screenshots
<img width="1851" height="953" alt="Screenshot 2026-02-04 125218" src="https://github.com/user-attachments/assets/1bb6421a-a29d-46ed-b6ca-a5601e75baf7" />
<img width="1897" height="942" alt="Screenshot 2026-02-04 125239" src="https://github.com/user-attachments/assets/2cac9de6-55dc-4b62-af03-a609e274c814" />
<img width="1880" height="952" alt="Screenshot 2026-02-04 125435" src="https://github.com/user-attachments/assets/3ded2066-e6a9-4ed9-9207-3dc3382326eb" />
<img width="1863" height="881" alt="Screenshot 2026-02-04 125456" src="https://github.com/user-attachments/assets/630617ec-d8ba-4cf4-ac0c-d62e9dcee010" />






