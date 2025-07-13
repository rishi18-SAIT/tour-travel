🌍 Tour and Travel Booking Website
This is a full-stack Tour and Travel Booking Web Application built using the MERN stack. It allows users to browse tour packages, register and log in, book tours, and manage their bookings through a responsive, user-friendly interface.

📌 Features
🔐 User authentication and authorization (JWT-based)

🧳 View available tours with images, descriptions, and prices

📅 Book a tour and view booking history

👤 User profile management

📈 Admin dashboard to manage tours and bookings

📱 Responsive UI (Mobile + Desktop) 
🛠 Tech Stack
Frontend	Backend	Database
React.js	Node.js + Express.js	MongoDB

📁 Project Structure
bash
Copy
Edit
/client       → React Frontend
/server       → Node.js + Express Backend
  /models     → Mongoose Models
  /routes     → API Routes (Auth, Tours, Bookings)
  /controllers→ Route Logic
  /config     → DB Config and Middleware
⚙️ Installation
Prerequisites
Node.js (v16+)

MongoDB installed locally or MongoDB Atlas URI

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/tour-booking-mern.git
cd tour-booking-mern
2. Set Up Backend
bash
Copy
Edit
cd server
npm install
Create a .env file in /server:

ini
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/tourBookingDB
JWT_SECRET=your_jwt_secret_key
Then run the server:

bash
Copy
Edit
npm run dev
3. Set Up Frontend
bash
Copy
Edit
cd ../client
npm install
npm start
🖼 Sample Pages
Home Page with Tour Listings

Tour Details Page

Booking Form Page

Login & Register Pages

User Dashboard (View Bookings)

Admin Dashboard (Add/Edit/Delete Tours)

📡 API Endpoints
Authentication
POST /api/auth/register

POST /api/auth/login

Tours
GET /api/tours

GET /api/tours/:id

POST /api/tours (Admin)

PUT /api/tours/:id (Admin)

DELETE /api/tours/:id (Admin)

Bookings
POST /api/bookings

GET /api/bookings/user/:userId

GET /api/bookings (Admin)

🚀 Deployment
This app can be deployed on:

Frontend → Netlify / Vercel

Backend → Render / Railway / Heroku

Database → MongoDB Atlas

📚 References
React.js: https://reactjs.org

Express.js: https://expressjs.com

MongoDB: https://www.mongodb.com

Mongoose: https://mongoosejs.com

🙋‍♂️ Author
Rishikesh Ranjan
👨‍🎓 BE – Information Science, Sambhram Institute of Technology, Bangalore
📧 rishikesh9098@gmail.com
🔗 GitHub | LinkedIn

📄 License
This project is open-source and free to use under the MIT License.
