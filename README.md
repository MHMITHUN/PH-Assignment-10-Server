# 🌱 Gardening Community Hub - Server

Backend API for the Gardening Community Hub application.

## 🚀 Live API URL
[Coming Soon - Deploy to Vercel]

## ✨ Features

- **RESTful API** endpoints for tips and gardeners
- **MongoDB Integration** with connection pooling
- **CRUD Operations** for gardening tips
- **Filtering Support** by difficulty level
- **Like System** with atomic increments
- **User-specific Queries** for personalized content

## 🛠️ Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Installation

\`\`\`bash
# Install dependencies
npm install

# Seed the database with gardener profiles
npm run seed

# Start development server
npm run dev

# Start production server
npm start
\`\`\`

## 🔧 Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
\`\`\`

## 📡 API Endpoints

### Tips

- \`GET /api/tips\` - Get all public tips (optional: ?difficulty=Easy|Medium|Hard)
- \`GET /api/tips/trending\` - Get top 6 trending tips (sorted by likes)
- \`GET /api/tips/user/:email\` - Get tips by user email
- \`GET /api/tips/:id\` - Get single tip by ID
- \`POST /api/tips\` - Create new tip
- \`PUT /api/tips/:id\` - Update tip
- \`DELETE /api/tips/:id\` - Delete tip
- \`PATCH /api/tips/:id/like\` - Increment like count

### Gardeners

- \`GET /api/gardeners\` - Get all gardeners
- \`GET /api/gardeners/active\` - Get 6 active gardeners

## 📊 Database Collections

### Tips Collection
\`\`\`javascript
{
  title: String,
  plantType: String,
  difficultyLevel: String,
  description: String,
  imageUrl: String,
  category: String,
  availability: String,
  userEmail: String,
  userName: String,
  totalLiked: Number,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Gardeners Collection
\`\`\`javascript
{
  name: String,
  age: Number,
  gender: String,
  status: String,
  experience: String,
  imageUrl: String,
  totalSharedTips: Number,
  bio: String
}
\`\`\`

## 👨‍💻 Author

Built with 💚 for the gardening community From MAHAMUDUL HASAN
