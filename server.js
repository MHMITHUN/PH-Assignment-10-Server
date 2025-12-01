import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;
let tipsCollection;
let gardenersCollection;
let isConnected = false;

async function connectDB() {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        console.log('🔄 Connecting to MongoDB...');
        await client.connect();
        db = client.db('gardening-hub');
        tipsCollection = db.collection('tips');
        gardenersCollection = db.collection('gardeners');
        isConnected = true;
        console.log('══════════════════════════════════════════════════');
        console.log('✅ Successfully connected to MongoDB!');
        console.log('📦 Database: gardening-hub');
        console.log('📊 Collections: tips, gardeners');
        console.log('══════════════════════════════════════════════════');
    } catch (error) {
        console.log('══════════════════════════════════════════════════');
        console.error('❌ MongoDB connection FAILED!');
        console.error('💡 Check your .env file has the correct MONGODB_URI');
        console.error('💡 URI should end with: &tlsAllowInvalidCertificates=true');
        console.log('══════════════════════════════════════════════════');
        console.error('Error:', error.message);
        throw error; // Don't exit in serverless
    }
}

// Connect to database on module load
connectDB().catch(console.error);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Gardening Hub API is running!' });
});

// ============= TIPS ROUTES =============

// Get all public tips (with optional difficulty filter)
app.get('/api/tips', async (req, res) => {
    try {
        const { difficulty } = req.query;
        const query = { availability: 'Public' };

        if (difficulty && difficulty !== 'All') {
            query.difficultyLevel = difficulty;
        }

        const tips = await tipsCollection.find(query).sort({ createdAt: -1 }).toArray();
        res.json(tips);
    } catch (error) {
        console.error('Error fetching tips:', error);
        res.status(500).json({ error: 'Failed to fetch tips' });
    }
});

// Get top 6 trending tips (sorted by totalLiked)
app.get('/api/tips/trending', async (req, res) => {
    try {
        const tips = await tipsCollection
            .find({ availability: 'Public' })
            .sort({ totalLiked: -1 })
            .limit(6)
            .toArray();
        res.json(tips);
    } catch (error) {
        console.error('Error fetching trending tips:', error);
        res.status(500).json({ error: 'Failed to fetch trending tips' });
    }
});

// Get user's tips (both public and private)
app.get('/api/tips/user/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const tips = await tipsCollection
            .find({ userEmail: email })
            .sort({ createdAt: -1 })
            .toArray();
        res.json(tips);
    } catch (error) {
        console.error('Error fetching user tips:', error);
        res.status(500).json({ error: 'Failed to fetch user tips' });
    }
});

// Get single tip by ID
app.get('/api/tips/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tip = await tipsCollection.findOne({ _id: new ObjectId(id) });

        if (!tip) {
            return res.status(404).json({ error: 'Tip not found' });
        }

        res.json(tip);
    } catch (error) {
        console.error('Error fetching tip:', error);
        res.status(500).json({ error: 'Failed to fetch tip' });
    }
});

// Create new tip
app.post('/api/tips', async (req, res) => {
    try {
        const newTip = {
            ...req.body,
            totalLiked: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await tipsCollection.insertOne(newTip);
        res.status(201).json({ insertedId: result.insertedId, message: 'Tip created successfully' });
    } catch (error) {
        console.error('Error creating tip:', error);
        res.status(500).json({ error: 'Failed to create tip' });
    }
});

// Update tip
app.put('/api/tips/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = {
            ...req.body,
            updatedAt: new Date()
        };

        // Remove fields that shouldn't be updated
        delete updates.totalLiked;
        delete updates.createdAt;
        delete updates.userEmail;
        delete updates.userName;

        const result = await tipsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Tip not found' });
        }

        res.json({ message: 'Tip updated successfully' });
    } catch (error) {
        console.error('Error updating tip:', error);
        res.status(500).json({ error: 'Failed to update tip' });
    }
});

// Delete tip
app.delete('/api/tips/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await tipsCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Tip not found' });
        }

        res.json({ message: 'Tip deleted successfully' });
    } catch (error) {
        console.error('Error deleting tip:', error);
        res.status(500).json({ error: 'Failed to delete tip' });
    }
});

// Increment like count
app.patch('/api/tips/:id/like', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await tipsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $inc: { totalLiked: 1 } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Tip not found' });
        }

        res.json({ message: 'Tip liked successfully' });
    } catch (error) {
        console.error('Error liking tip:', error);
        res.status(500).json({ error: 'Failed to like tip' });
    }
});

// ============= GARDENERS ROUTES =============

// Get all gardeners
app.get('/api/gardeners', async (req, res) => {
    try {
        const gardeners = await gardenersCollection.find({}).toArray();
        res.json(gardeners);
    } catch (error) {
        console.error('Error fetching gardeners:', error);
        res.status(500).json({ error: 'Failed to fetch gardeners' });
    }
});

// Get 6 active gardeners
app.get('/api/gardeners/active', async (req, res) => {
    try {
        const gardeners = await gardenersCollection
            .find({ status: 'Active' })
            .limit(6)
            .toArray();
        res.json(gardeners);
    } catch (error) {
        console.error('Error fetching active gardeners:', error);
        res.status(500).json({ error: 'Failed to fetch active gardeners' });
    }
});

// Start server (Only if not running on Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`🌱 Gardening Hub API running on port ${port}`);
    });
}

// Graceful shutdown
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});

export default app;
