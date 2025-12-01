import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const gardenerProfiles = [
    {
        name: "Sarah Johnson",
        age: 34,
        gender: "Female",
        status: "Active",
        experience: "8 years",
        imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        totalSharedTips: 45,
        bio: "Passionate about organic vegetable gardening and composting. Love sharing tips on balcony gardens!"
    },
    {
        name: "Michael Chen",
        age: 42,
        gender: "Male",
        status: "Active",
        experience: "12 years",
        imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
        totalSharedTips: 62,
        bio: "Hydroponics enthusiast and indoor gardening expert. Always experimenting with new techniques."
    },
    {
        name: "Emily Rodriguez",
        age: 28,
        gender: "Female",
        status: "Active",
        experience: "5 years",
        imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
        totalSharedTips: 31,
        bio: "Specializing in vertical gardens and space-saving techniques for small apartments."
    },
    {
        name: "David Thompson",
        age: 55,
        gender: "Male",
        status: "Active",
        experience: "20+ years",
        imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        totalSharedTips: 89,
        bio: "Retired botanist with a passion for native plants and sustainable gardening practices."
    },
    {
        name: "Lisa Patel",
        age: 31,
        gender: "Female",
        status: "Active",
        experience: "7 years",
        imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
        totalSharedTips: 38,
        bio: "Herb garden specialist. Love teaching beginners about growing herbs in small spaces."
    },
    {
        name: "James Wilson",
        age: 39,
        gender: "Male",
        status: "Active",
        experience: "10 years",
        imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
        totalSharedTips: 54,
        bio: "Container gardening expert and pest control advocate using natural methods."
    },
    {
        name: "Amanda Foster",
        age: 26,
        gender: "Female",
        status: "Inactive",
        experience: "3 years",
        imageUrl: "https://randomuser.me/api/portraits/women/7.jpg",
        totalSharedTips: 18,
        bio: "Beginner-friendly tips for succulent care and low-maintenance plants."
    },
    {
        name: "Robert Martinez",
        age: 48,
        gender: "Male",
        status: "Inactive",
        experience: "15 years",
        imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
        totalSharedTips: 67,
        bio: "Fruit tree cultivation and seasonal planting strategies expert."
    },
    {
        name: "Jennifer Lee",
        age: 37,
        gender: "Female",
        status: "Inactive",
        experience: "9 years",
        imageUrl: "https://randomuser.me/api/portraits/women/9.jpg",
        totalSharedTips: 42,
        bio: "Flower garden designer with focus on pollinator-friendly landscapes."
    },
    {
        name: "Christopher Brown",
        age: 44,
        gender: "Male",
        status: "Inactive",
        experience: "11 years",
        imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
        totalSharedTips: 51,
        bio: "Soil health and composting systems specialist for urban gardeners."
    }
];

async function seedDatabase() {
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db('gardening-hub');
        const gardenersCollection = db.collection('gardeners');

        // Clear existing data
        await gardenersCollection.deleteMany({});
        console.log('🗑️  Cleared existing gardener data');

        // Insert gardener profiles
        const result = await gardenersCollection.insertMany(gardenerProfiles);
        console.log(`✅ Inserted ${result.insertedCount} gardener profiles`);

        console.log('\n📊 Seed data summary:');
        console.log(`   Active gardeners: ${gardenerProfiles.filter(g => g.status === 'Active').length}`);
        console.log(`   Inactive gardeners: ${gardenerProfiles.filter(g => g.status === 'Inactive').length}`);
        console.log(`   Total gardeners: ${gardenerProfiles.length}`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await client.close();
        console.log('\n✅ Database connection closed');
    }
}

seedDatabase();
