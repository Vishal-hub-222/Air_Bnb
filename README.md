#🏡 WanderLust — Airbnb Clone

A full-stack **Airbnb-style listing platform** built with **Node.js, Express, MongoDB, EJS, Passport, and Cloudinary**.  
Users can sign up, log in, create listings, upload images, leave reviews, and manage their own content.

---

## ✨ Features

### 👤 Authentication & Authorization
- 🔐 User signup and login with **Passport (Local Strategy)**
- 🍪 Session-based authentication with **express-session**
- 💬 Flash messages for success/error feedback
- 🛡️ Route protection for logged-in users only
- ✅ Ownership checks:
  - Only listing owners can edit/delete listings
  - Only review authors can delete reviews

### 🏠 Listing Management
- ➕ Create new listings
- 📝 Edit listing details
- ❌ Delete listings
- 👀 View all listings and individual listing detail pages
- 🗂️ Category support (Room, Iconic Cities, Mountains, Castles, Amazing Pools, Camping, Boats)

### 🖼️ Image Uploads
- ☁️ Image upload support via **Multer + Cloudinary**
- 📁 Cloud storage folder configuration (`wanderlust_DEV`)

### ⭐ Reviews
- 💬 Add reviews to listings
- 🧹 Delete reviews
- 🔗 Reviews are linked to listings and cleaned up when a listing is deleted

### 🧱 Validation & Error Handling
- ✅ Request validation using **Joi** schemas
- 🧰 Centralized async error wrapping
- 🚨 Custom `ExpressError` utility

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Templating:** EJS + ejs-mate
- **Auth:** Passport, passport-local, passport-local-mongoose
- **File Uploads:** Multer, Cloudinary, multer-storage-cloudinary
- **Validation:** Joi
- **Sessions:** express-session + connect-mongo
- **UI:** Server-rendered EJS templates + custom CSS

---

## 📁 Project Structure

```bash
Air_Bnb_Clone/
├── controllers/        # Route controller logic
├── models/             # Mongoose models (Listing, User, Review)
├── routes/             # Express routes (listing, user, rating)
├── views/              # EJS templates
├── public/             # Static assets (CSS, JS, images)
├── utils/              # Utility classes/helpers
├── init/               # Seed/init scripts
├── app.js              # Main application entry
├── cloudConfig.js      # Cloudinary configuration
└── schema.js           # Joi validation schemas
```

---

## ⚙️ Installation & Setup

### 1) 📥 Clone repository
```bash
git clone <your-repo-url>
cd Air_Bnb_Clone
```

### 2) 📦 Install dependencies
```bash
npm install
```

### 3) 🔑 Create `.env` file
Create a `.env` file in the project root and add:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 4) ▶️ Run the app
```bash
node app.js
```

Server will start on:  
👉 `http://localhost:3000`

---

## 🚀 Main Routes

### Public
- `GET /` → Redirect to listings
- `GET /listings` → All listings
- `GET /listings/:id` → Listing details

### Auth
- `GET /signup` / `POST /signup`
- `GET /login` / `POST /login`
- `GET /logout`

### Listings (Protected)
- `GET /listings/new` → New listing form
- `POST /listings/new` → Create listing
- `GET /listings/:id/edit` → Edit form
- `PUT /listings/:id/edit` → Update listing
- `DELETE /listings/:id/delete` → Delete listing

### Reviews (Protected)
- `POST /listings/:id/review` → Add review
- `DELETE /listings/:id/delete/:reviewid` → Delete review

---

## 🔒 Notes

- Use a valid MongoDB Atlas connection string in `ATLASDB_URL`.
- Ensure Cloudinary credentials are valid for image uploads.
- Session secret should be strong in production.
- Set proper environment configuration before deployment.

---

## 📌 Future Improvements

- ❤️ Wishlist / favorites support
- 🔎 Search and filter listings
- 📍 Map integration for listing locations
- 🧪 Automated tests (unit + integration)
- 🐳 Docker support for deployment

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the project, create a feature branch, and open a PR.

---

## 📄 License

This project is currently unlicensed (`ISC` in `package.json`).
You can add an explicit license file if needed.

---

## 🙌 Author Note

This is a major learning project and a strong full-stack milestone.  
If you like it, consider improving it further and making it production-ready! 🚀
