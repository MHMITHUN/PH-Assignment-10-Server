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
        name: "আব্দুল করিম (Abdul Karim)",
        age: 45,
        gender: "Male",
        status: "Active",
        experience: "15 years",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        totalSharedTips: 67,
        bio: "Organic vegetable gardening expert from Dhaka. Specializes in rooftop gardens and home composting."
    },
    {
        name: "ফাতেমা খাতুন (Fatema Khatun)",
        age: 38,
        gender: "Female",
        status: "Active",
        experience: "12 years",
        imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        totalSharedTips: 54,
        bio: "Passionate about flower gardening and balcony gardens. Grows seasonal vegetables in limited spaces."
    },
    {
        name: "রহিম উদ্দিন (Rahim Uddin)",
        age: 52,
        gender: "Male",
        status: "Active",
        experience: "20+ years",
        imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
        totalSharedTips: 89,
        bio: "Traditional farming methods combined with modern techniques. Fruit tree cultivation specialist."
    },
    {
        name: "নাসরিন সুলতানা (Nasrin Sultana)",
        age: 35,
        gender: "Female",
        status: "Active",
        experience: "10 years",
        imageUrl: "https://randomuser.me/api/portraits/women/50.jpg",
        totalSharedTips: 48,
        bio: "Indoor plant enthusiast from Chittagong. Expert in growing herbs and medicinal plants at home."
    },
    {
        name: "হাসান আলী (Hasan Ali)",
        age: 41,
        gender: "Male",
        status: "Active",
        experience: "14 years",
        imageUrl: "https://randomuser.me/api/portraits/men/55.jpg",
        totalSharedTips: 62,
        bio: "Hydroponic farming pioneer in Bangladesh. Teaches modern urban gardening techniques."
    },
    {
        name: "শাহনাজ আক্তার (Shahnaz Akhter)",
        age: 29,
        gender: "Female",
        status: "Active",
        experience: "6 years",
        imageUrl: "https://randomuser.me/api/portraits/women/60.jpg",
        totalSharedTips: 39,
        bio: "Young gardening enthusiast promoting eco-friendly practices and vertical gardens in Sylhet."
    },
    {
        name: "মোস্তফা কামাল (Mostafa Kamal)",
        age: 48,
        gender: "Male",
        status: "Inactive",
        experience: "16 years",
        imageUrl: "https://randomuser.me/api/portraits/men/62.jpg",
        totalSharedTips: 71,
        bio: "Seasonal vegetable farming expert. Focuses on pesticide-free organic produce."
    },
    {
        name: "রুমানা আহমেদ (Rumana Ahmed)",
        age: 33,
        gender: "Female",
        status: "Inactive",
        experience: "8 years",
        imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        totalSharedTips: 43,
        bio: "Container gardening specialist from Rajshahi. Loves growing flowers and ornamental plants."
    },
    {
        name: "জাহিদ হোসেন (Zahid Hossain)",
        age: 56,
        gender: "Male",
        status: "Inactive",
        experience: "22 years",
        imageUrl: "https://randomuser.me/api/portraits/men/70.jpg",
        totalSharedTips: 78,
        bio: "Experienced farmer and gardening mentor. Specializes in mango and jackfruit cultivation."
    },
    {
        name: "সাবিনা ইয়াসমিন (Sabina Yasmin)",
        age: 31,
        gender: "Female",
        status: "Inactive",
        experience: "7 years",
        imageUrl: "https://randomuser.me/api/portraits/women/72.jpg",
        totalSharedTips: 36,
        bio: "Balcony garden designer from Khulna. Promotes sustainable gardening in urban apartments."
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
