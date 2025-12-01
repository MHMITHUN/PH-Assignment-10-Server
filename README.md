# 🌱 Gardening Hub - Server

RESTful API backend for the Gardening Hub application, providing endpoints for gardening tips management and gardener profiles.

## 🚀 Live API

- **API Base URL:** [https://ph-assignment-10-server-puce.vercel.app](https://ph-assignment-10-server-puce.vercel.app)
- **Client Repository:** [GitHub - PH-Assignment-10-Client](https://github.com/MHMITHUN/PH-Assignment-10-Client)

## 📋 API Endpoints

### 🏠 Health Check

```http
GET /
```

**Response:**
```json
{
  "message": "Gardening Hub API is running!"
}
```

---

### 📝 Gardening Tips

#### Get All Public Tips
```http
GET /api/tips
GET /api/tips?difficulty=Easy
```

**Query Parameters:**
- `difficulty` (optional): `Easy`, `Medium`, `Hard`, or `All`

#### Get Trending Tips
```http
GET /api/tips/trending
```
Returns top 6 most liked tips.

#### Get User's Tips
```http
GET /api/tips/user/:email
```
Returns all tips (public + private) for a specific user.

#### Get Single Tip
```http
GET /api/tips/:id
```

#### Create Tip
```http
POST /api/tips
```

**Request Body:**
```json
{
  "title": "How to Grow Tomatoes",
  "description": "Step-by-step guide...",
  "category": "Vegetable",
  "difficultyLevel": "Medium",
  "availability": "Public",
  "userEmail": "user@example.com",
  "userName": "John Doe",
  "userPhoto": "https://example.com/photo.jpg"
}
```

#### Update Tip
```http
PUT /api/tips/:id
```

**Request Body:** (same as create, but all fields optional)

#### Delete Tip
```http
DELETE /api/tips/:id
```

#### Like a Tip
```http
PATCH /api/tips/:id/like
```
Increments the `totalLiked` count by 1.

---

### 👥 Gardeners

#### Get All Gardeners
```http
GET /api/gardeners
```

#### Get Active Gardeners
```http
GET /api/gardeners/active
```
Returns 6 active gardener profiles.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **ODM:** MongoDB Native Driver
- **Environment:** dotenv
- **CORS:** cors middleware
- **Deployment:** Vercel (Serverless)

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/MHMITHUN/PH-Assignment-10-Server.git
   cd PH-Assignment-10-Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

   **Get MongoDB URI:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

   Example:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gardening-hub?retryWrites=true&w=majority
   ```

4. **Seed the database** (optional, for sample data)
   ```bash
   npm run seed
   ```
   This adds 10 sample gardener profiles.

5. **Run development server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

## 🗄️ Database Schema

### Tips Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  difficultyLevel: String,  // "Easy" | "Medium" | "Hard"
  availability: String,      // "Public" | "Private"
  userEmail: String,
  userName: String,
  userPhoto: String,
  totalLiked: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Gardeners Collection

```javascript
{
  _id: ObjectId,
  name: String,
  age: Number,
  gender: String,
  status: String,            // "Active" | "Inactive"
  experience: String,
  image: String,
  totalSharedTips: Number,
  bio: String
}
```

## 🌐 Deployment (Vercel)

### Automatic Deployment

1. **Connect to Vercel**
   - Push code to GitHub
   - Import repository in Vercel
   - Vercel auto-detects Node.js project

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NODE_ENV`: `production` (optional, auto-set)

3. **Deployment Configuration**
   
   The `vercel.json` file is already configured:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

4. **Deploy**
   - Push to GitHub
   - Vercel auto-deploys
   - Your API is live!

### Manual Deployment

```bash
npm install -g vercel
vercel --prod
```

## 📁 Project Structure

```
server/
├── server.js              # Main application file
├── seedData.js            # Database seeding script
├── vercel.json            # Vercel configuration
├── .env                   # Environment variables (gitignored)
├── .env.example           # Example environment file
├── .gitignore            # Git ignore rules
└── package.json          # Dependencies and scripts
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | ✅ |
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `NODE_ENV` | Environment (auto-set on Vercel) | ⚪ |

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server (with auto-reload) |
| `npm run seed` | Seed database with sample data |

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl https://ph-assignment-10-server-puce.vercel.app/

# Get all public tips
curl https://ph-assignment-10-server-puce.vercel.app/api/tips

# Get active gardeners
curl https://ph-assignment-10-server-puce.vercel.app/api/gardeners/active

# Get tips by difficulty
curl https://ph-assignment-10-server-puce.vercel.app/api/tips?difficulty=Easy
```

### Using Postman

1. Import the API endpoints
2. Set base URL: `https://ph-assignment-10-server-puce.vercel.app`
3. Test all endpoints listed above

## 🔐 CORS Configuration

The API allows requests from:
- All origins (for development)
- Specific origins can be configured in production

To restrict CORS:
```javascript
app.use(cors({
  origin: 'https://your-client-domain.netlify.app'
}));
```

## 🚀 Features

- ✅ RESTful API design
- ✅ MongoDB database integration
- ✅ CRUD operations for tips
- ✅ User-specific tip management
- ✅ Trending/popular tips
- ✅ Gardener profiles
- ✅ Like/upvote system
- ✅ Difficulty-based filtering
- ✅ Serverless deployment ready
- ✅ Environment-based configuration

## 📊 Database Seeding

The seed script populates the database with 10 sample gardener profiles:

```bash
npm run seed
```

**Output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing gardener data
✅ Inserted 10 gardener profiles
📊 Active gardeners: 6
📊 Inactive gardeners: 4
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

If you see connection errors:
1. Check your `MONGODB_URI` in `.env`
2. Ensure your IP is whitelisted in MongoDB Atlas
3. Verify username/password are correct

### Vercel Deployment Issues

If deployment fails:
1. Check environment variables are set in Vercel
2. Ensure `MONGODB_URI` is added
3. Check deployment logs for specific errors

### Port Already in Use

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F
```

## 🤝 Contributing

This is an academic assignment project. Not open for contributions.

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

**MD Mahamudul Hasan**
- GitHub: [@MHMITHUN](https://github.com/MHMITHUN)

## 🙏 Acknowledgments

- Programming Hero Assignment 10
- MongoDB Atlas for database hosting
- Vercel for serverless deployment
- Express.js community
