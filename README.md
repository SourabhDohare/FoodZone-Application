## 🍔 Food Zone – React Food Filtering App

A modern and responsive food browsing web application built using React (Vite) and Express.js.
Users can search food items, filter by category, and view dynamic data fetched from a backend API.

## TRY FOODZONE just Click on this Link 


  ## 🚀 Features

  🔍 Real-time Search Functionality
  
  🍳 Category Filtering (Breakfast / Lunch / Dinner)
  
  ⚡ Dynamic Data Fetching from Backend
  
  🎨 Styled Components for modern UI
  
  📱 Fully Responsive Layout
  
  🔄 Combined Search + Filter Logic
  
  🚦 Loading & Error Handling

## 🛠️ Tech Stack

  🔹 Frontend 
    - React (Vite)
    - JavaScript (ES6+)
    - Styled Components
    - Fetch API
  
  🔹 Backend 
    - Node.js
    - Express.js
    - CORS

## 📂 Project Structure
    food-zone/
    │
    ├── client/                 # React Frontend
    │   ├── components/
    │   ├── assets/
    │   └── App.jsx
    │
    ├── server/                 # Express Backend
    │   └── index.js
    │
    ├── screenshots/            # Project Screenshots
    └── README.md

  ## ⚙️ Installation & Setup
  1. Clone the Repository

    git clone https://github.com/your-username/food-zone.git
    cd food-zone

   2. Setup Backend

    cd server
    npm install
    npm run dev

    Backend will run on:
    http://localhost:9000
  
  3. Setup Frontend

    cd client
    npm install
    npm run dev 

    Frontend will run on:
    http://localhost:5173

  4. 🔌 API Endpoint

  GET /
  
  Returns all food items.

  Example response:

    [
      {
        "name": "Burger",
        "price": 23,
        "text": "Classic cheeseburger with fresh ingredients",
        "image": "/images/burger.png",
        "type": "lunch"
      }
    ]

  ## 🧠 Application Logic

  Data fetched using useEffect
  
  State handled using useState
  
  Filtering done using Array.filter()
  
  Search and category filter work together
  
  Conditional rendering for loading & errors

  ## 📸 Screenshots

  ## HomePage
  
  <img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/8de83fa9-ab1d-47d5-a387-48a41df5d2bf" />


  ## Filter
  
  <img width="1919" height="1008" alt="image" src="https://github.com/user-attachments/assets/062aadf7-0e30-4acf-ab7e-96589c2b90aa" />

  ## Search

  <img width="1919" height="1011" alt="image" src="https://github.com/user-attachments/assets/ec6abdc8-0e6d-4a99-adb5-497d5eb4c127" />


  ## Data Fetching

  <img width="1919" height="1009" alt="image" src="https://github.com/user-attachments/assets/2a270f70-e447-42a7-9328-aca6836827a4" />


  ## Responsive

  <img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/4a88a9ce-1795-4f01-bd16-36df835f8312" />

  <img width="1247" height="891" alt="image" src="https://github.com/user-attachments/assets/6ae0593f-b537-40a2-b580-d2106e49b909" />

  <img width="1919" height="1009" alt="image" src="https://github.com/user-attachments/assets/02276c25-85bf-41f3-b318-abb6edf18298" />

  ## Error Handling

  <img width="1919" height="1007" alt="image" src="https://github.com/user-attachments/assets/be0a743d-73cc-4aab-a81d-a3eb282a33ea" />
  
  <img width="1919" height="1009" alt="image" src="https://github.com/user-attachments/assets/8f515e94-2926-4e06-8c51-a64cbc2121e0" />

  
 ## 🌟 Future Improvements

  🛒 Add Cart Functionality
  
  ⭐ Add Ratings System
  
  🌙 Dark/Light Mode Toggle
  
  🗄️ Connect to MongoDB Database


  ## 👨‍💻 Author
  
  Sourabh Dohare

  
