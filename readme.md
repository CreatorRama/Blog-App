# Blog Editor Application


A full-stack blog editor with auto-save draft functionality, built with Next.js (App Router) and Node.js.

## ✨ Features

- **Rich text editor** with markdown support
- **Auto-save drafts** (every 30 seconds or after inactivity)
- **Create, edit, publish, and delete** blog posts
- **User authentication** with JWT (login/register)
- **Dashboard** with blog statistics
- **Responsive design** for all devices
- **Modern UI** with Tailwind CSS

## 🛠️ Tech Stack

### Frontend:
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Axios
- React Hot Toast
- Heroicons

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blog-editor.git
   cd blog-editor
   ```

2. **Set up backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm start
   ```

3. **Set up frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.local.example .env.local
   # Edit .env.local with API URL
   npm run dev
   ```

4. **Access the app**
   * Frontend: `http://localhost:3000`
   * Backend: `http://localhost:5000`

## 📂 Project Structure

```
blog-editor/
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.jsx
│   │   │   └── register/
│   │   │       └── page.jsx
│   │   ├── blogs/
│   │   │   ├── [id]/
│   │   │   │   ├── edit/
│   │   │   │   │   └── page.jsx
│   │   │   │   └── page.jsx
│   │   │   ├── new/
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   ├── components/
│   │   │   ├── AuthProvider.jsx
│   │   │   ├── BlogEditor.jsx
│   │   │   ├── BlogForm.jsx
│   │   │   ├── BlogsList.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Notification.jsx
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── lib/
│   │   ├── api.js
│   │   └── utils.js
│   ├── next.config.js
│   └── package.json
└── backend/
    ├── controllers/        # Route handlers
    ├── models/             # MongoDB schemas
    ├── routes/             # API endpoints
    ├── middleware/         # Auth middleware
    ├── server.js           # Main server file
    ├── .env.example
    ├── package.json
    └── package-lock.json
```

## ⚙️ Configuration

### Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blog-editor
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## 📜 Available Commands

### Frontend:
```bash
npm run dev    # Start dev server
npm run build  # Create production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Backend:
```bash
npm start      # Start production server
npm run dev    # Start dev server (nodemon)
```

## 🌐 Deployment

### Frontend (Vercel):
1. Push to GitHub
2. Create Vercel project
3. Connect repository
4. Add env variables
5. Deploy!

### Backend Options:
* Render
* Railway
* AWS EC2

## 🤝 Contributing
1. Fork the project
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open PR

## 📄 License
MIT License - see LICENSE for details.
