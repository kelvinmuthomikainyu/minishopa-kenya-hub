import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Influencer from '../models/Influencer.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/minishopa-kenya');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedCategories = async () => {
  const categories = [
    {
      name: 'Farm Produce',
      description: 'Fresh fruits, vegetables, and agricultural products',
      icon: 'Leaf',
      sortOrder: 1
    },
    {
      name: 'Groceries & Food',
      description: 'Essential food items and household groceries',
      icon: 'ShoppingBasket',
      sortOrder: 2
    },
    {
      name: 'Clothing & Fashion',
      description: 'Clothes, shoes, and fashion accessories',
      icon: 'Shirt',
      sortOrder: 3
    },
    {
      name: 'Electronics',
      description: 'Phones, computers, and electronic devices',
      icon: 'Smartphone',
      sortOrder: 4
    },
    {
      name: 'Drinks & Beverages',
      description: 'Soft drinks, juices, and non-alcoholic beverages',
      icon: 'Coffee',
      sortOrder: 5
    },
    {
      name: 'Liquor & Spirits',
      description: 'Alcoholic beverages and spirits',
      icon: 'Wine',
      sortOrder: 6
    },
    {
      name: 'Jewelry & Accessories',
      description: 'Jewelry, watches, and fashion accessories',
      icon: 'Gem',
      sortOrder: 7
    },
    {
      name: 'Toys & Games',
      description: 'Children toys, games, and entertainment',
      icon: 'Gamepad2',
      sortOrder: 8
    },
    {
      name: 'Household Items',
      description: 'Home essentials and daily use products',
      icon: 'Home',
      sortOrder: 9
    },
    {
      name: 'Health & Beauty',
      description: 'Personal care, cosmetics, and health products',
      icon: 'Heart',
      sortOrder: 10
    },
    {
      name: 'Livestock & Poultry',
      description: 'Live animals, meat, and dairy products',
      icon: 'Beef',
      sortOrder: 11
    },
    {
      name: 'Crafts & Handmade',
      description: 'Traditional crafts and handmade items',
      icon: 'Palette',
      sortOrder: 12
    }
  ];

  await Category.deleteMany({});
  const createdCategories = await Category.insertMany(categories);
  console.log('✅ Categories seeded');
  return createdCategories;
};

const seedUsers = async () => {
  const users = [
    {
      firstName: 'John',
      lastName: 'Kamau',
      email: 'john.kamau@example.com',
      phone: '0712345678',
      password: 'password123',
      role: 'seller',
      location: {
        county: 'Nairobi',
        town: 'Nairobi'
      },
      isVerified: true
    },
    {
      firstName: 'Mary',
      lastName: 'Wanjiku',
      email: 'mary.wanjiku@example.com',
      phone: '0723456789',
      password: 'password123',
      role: 'seller',
      location: {
        county: 'Kiambu',
        town: 'Thika'
      },
      isVerified: true
    },
    {
      firstName: 'Peter',
      lastName: 'Mwangi',
      email: 'peter.mwangi@example.com',
      phone: '0734567890',
      password: 'password123',
      role: 'buyer',
      location: {
        county: 'Nakuru',
        town: 'Nakuru'
      },
      isVerified: true
    },
    {
      firstName: 'Grace',
      lastName: 'Nyong',
      email: 'grace.nyong@example.com',
      phone: '0745678901',
      password: 'password123',
      role: 'seller',
      location: {
        county: 'Kisumu',
        town: 'Kisumu'
      },
      isVerified: true
    }
  ];

  await User.deleteMany({});
  const createdUsers = await User.insertMany(users);
  console.log('✅ Users seeded');
  return createdUsers;
};

const seedProducts = async (categories, users) => {
  const sellers = users.filter(user => user.role === 'seller');
  
  // Get category references with error checking
  const farmProduceCategory = categories.find(cat => cat.name === 'Farm Produce');
  const groceriesCategory = categories.find(cat => cat.name === 'Groceries & Food');
  const clothingCategory = categories.find(cat => cat.name === 'Clothing & Fashion');
  const electronicsCategory = categories.find(cat => cat.name === 'Electronics');
  const drinksCategory = categories.find(cat => cat.name === 'Drinks & Beverages');
  const liquorCategory = categories.find(cat => cat.name === 'Liquor & Spirits');
  const jewelryCategory = categories.find(cat => cat.name === 'Jewelry & Accessories');
  const toysCategory = categories.find(cat => cat.name === 'Toys & Games');
  const householdCategory = categories.find(cat => cat.name === 'Household Items');
  const healthCategory = categories.find(cat => cat.name === 'Health & Beauty');
  const livestockCategory = categories.find(cat => cat.name === 'Livestock & Poultry');
  const craftsCategory = categories.find(cat => cat.name === 'Crafts & Handmade');
  
  // Check if all categories were found
  if (!farmProduceCategory || !groceriesCategory || !clothingCategory || !electronicsCategory || 
      !drinksCategory || !liquorCategory || !jewelryCategory || !toysCategory || 
      !householdCategory || !healthCategory || !livestockCategory || !craftsCategory) {
    console.error('❌ Some categories not found. Available categories:', categories.map(c => c.name));
    throw new Error('Missing required categories');
  }
  
  // Check if sellers exist
  if (sellers.length === 0) {
    console.error('❌ No sellers found');
    throw new Error('No sellers available');
  }

  const products = [
    // Farm Produce
    {
      name: 'Fresh Avocados',
      description: 'Premium quality Hass avocados, perfectly ripe and ready to eat. Rich in healthy fats and nutrients.',
      price: 150,
      originalPrice: 200,
      category: farmProduceCategory._id,
      seller: sellers[0]._id,
      images: [{ url: '/uploads/avocados.jpg', alt: 'Fresh Hass Avocados', isPrimary: true }],
      stock: { quantity: 50, unit: 'kg' },
      location: { county: 'Nairobi', town: 'Nairobi' },
      tags: ['organic', 'fresh', 'healthy'],
      isOrganic: true,
      isFeatured: true,
      specifications: { origin: 'Murang\'a County', harvestDate: new Date('2024-01-10') }
    },
    {
      name: 'Organic Tomatoes',
      description: 'Vine-ripened organic tomatoes, perfect for cooking and salads. Grown without pesticides.',
      price: 80,
      category: farmProduceCategory._id,
      seller: sellers[1]._id,
      images: [{ url: '/uploads/tomatoes.jpg', alt: 'Organic Tomatoes', isPrimary: true }],
      stock: { quantity: 100, unit: 'kg' },
      location: { county: 'Kiambu', town: 'Thika' },
      tags: ['organic', 'fresh', 'vegetables'],
      isOrganic: true,
      specifications: { origin: 'Kiambu County', harvestDate: new Date('2024-01-12') }
    },

    // Groceries & Food
    {
      name: 'Farm Fresh Eggs',
      description: 'Free-range chicken eggs from happy hens. Rich in protein and perfect for breakfast.',
      price: 18,
      category: groceriesCategory._id,
      seller: sellers[2]._id,
      images: [{ url: '/uploads/eggs.jpg', alt: 'Farm Fresh Eggs', isPrimary: true }],
      stock: { quantity: 200, unit: 'pieces' },
      location: { county: 'Nakuru', town: 'Nakuru' },
      tags: ['fresh', 'protein', 'breakfast'],
      specifications: { origin: 'Nakuru County' }
    },

    // Clothing & Fashion
    {
      name: 'Kenyan Cotton T-Shirts',
      description: 'Comfortable 100% cotton t-shirts with traditional Kenyan designs. Available in multiple colors.',
      price: 800,
      originalPrice: 1200,
      category: clothingCategory._id,
      seller: sellers[0]._id,
      images: [{ url: '/uploads/cotton-tshirts.jpg', alt: 'Kenyan Cotton T-Shirts', isPrimary: true }],
      stock: { quantity: 50, unit: 'pieces' },
      location: { county: 'Nairobi', town: 'Nairobi' },
      tags: ['cotton', 'kenyan', 'fashion', 'comfortable'],
      isFeatured: true,
      specifications: { brand: 'Kenya Threads', color: 'Multiple Colors' }
    },
    {
      name: 'Maasai Sandals',
      description: 'Handcrafted traditional Maasai sandals made from genuine leather. Durable and stylish.',
      price: 1500,
      category: clothingCategory._id,
      seller: sellers[1]._id,
      images: [{ url: '/uploads/maasai-sandals.jpg', alt: 'Maasai Sandals', isPrimary: true }],
      stock: { quantity: 25, unit: 'pieces' },
      location: { county: 'Kajiado', town: 'Kajiado' },
      tags: ['leather', 'handmade', 'traditional', 'maasai'],
      specifications: { brand: 'Maasai Craft', origin: 'Kajiado County' }
    },

    // Electronics
    {
      name: 'Samsung Galaxy A14',
      description: 'Latest Samsung smartphone with 64GB storage, dual camera, and long-lasting battery.',
      price: 18500,
      originalPrice: 22000,
      category: electronicsCategory._id,
      seller: sellers[2]._id,
      images: [{ url: '/uploads/samsung-a14.jpg', alt: 'Samsung Galaxy A14', isPrimary: true }],
      stock: { quantity: 15, unit: 'pieces' },
      location: { county: 'Nairobi', town: 'Nairobi' },
      tags: ['smartphone', 'samsung', 'android', 'camera'],
      isFeatured: true,
      specifications: { brand: 'Samsung', color: 'Black' }
    },
    {
      name: 'Bluetooth Speakers',
      description: 'Portable wireless Bluetooth speakers with excellent sound quality and 8-hour battery life.',
      price: 2500,
      category: electronicsCategory._id,
      seller: sellers[3]._id,
      images: [{ url: '/uploads/bluetooth-speakers.jpg', alt: 'Bluetooth Speakers', isPrimary: true }],
      stock: { quantity: 30, unit: 'pieces' },
      location: { county: 'Mombasa', town: 'Mombasa' },
      tags: ['bluetooth', 'wireless', 'portable', 'music'],
      specifications: { brand: 'SoundMax', color: 'Blue' }
    },

    // Drinks & Beverages
    {
      name: 'Fresh Orange Juice',
      description: 'Freshly squeezed orange juice from Kenyan oranges. No preservatives, 100% natural.',
      price: 120,
      category: drinksCategory._id,
      seller: sellers[0]._id,
      images: [{ url: '/uploads/orange-juice.jpg', alt: 'Fresh Orange Juice', isPrimary: true }],
      stock: { quantity: 100, unit: 'liters' },
      location: { county: 'Machakos', town: 'Machakos' },
      tags: ['fresh', 'natural', 'vitamin-c', 'healthy'],
      isOrganic: true,
      specifications: { origin: 'Machakos County', expiryDate: new Date('2024-02-01') }
    },
    {
      name: 'Kenyan Tea Blend',
      description: 'Premium black tea blend from the highlands of Kenya. Rich flavor and aroma.',
      price: 350,
      category: drinksCategory._id,
      seller: sellers[1]._id,
      images: [{ url: '/uploads/kenyan-tea.jpg', alt: 'Kenyan Tea Blend', isPrimary: true }],
      stock: { quantity: 80, unit: 'pieces' },
      location: { county: 'Kericho', town: 'Kericho' },
      tags: ['tea', 'kenyan', 'premium', 'black-tea'],
      specifications: { origin: 'Kericho County', weight: '250g' }
    },

    // Liquor & Spirits
    {
      name: 'Tusker Beer (24 Pack)',
      description: 'Kenya\'s premium lager beer. Crisp, refreshing taste perfect for any occasion.',
      price: 2400,
      category: liquorCategory._id,
      seller: sellers[2]._id,
      images: [{ url: '/uploads/tusker-beer.jpg', alt: 'Tusker Beer 24 Pack', isPrimary: true }],
      stock: { quantity: 50, unit: 'pieces' },
      location: { county: 'Nairobi', town: 'Nairobi' },
      tags: ['beer', 'tusker', 'kenyan', 'lager'],
      specifications: { brand: 'Tusker', volume: '500ml x 24' }
    },
    {
      name: 'Kenya Cane Vodka',
      description: 'Premium Kenyan vodka distilled from sugarcane. Smooth taste and high quality.',
      price: 1800,
      category: liquorCategory._id,
      seller: sellers[3]._id,
      images: [{ url: '/uploads/kenya-cane.jpg', alt: 'Kenya Cane Vodka', isPrimary: true }],
      stock: { quantity: 20, unit: 'pieces' },
      location: { county: 'Nairobi', town: 'Nairobi' },
      tags: ['vodka', 'kenyan', 'premium', 'spirits'],
      specifications: { brand: 'Kenya Cane', volume: '750ml' }
    },

    // Jewelry & Accessories
    {
      name: 'Maasai Beaded Necklace',
      description: 'Authentic handmade Maasai beaded necklace with traditional patterns and vibrant colors.',
      price: 1200,
      category: jewelryCategory._id,
      seller: sellers[0]._id,
      images: [{ url: '/uploads/maasai-necklace.jpg', alt: 'Maasai Beaded Necklace', isPrimary: true }],
      stock: { quantity: 40, unit: 'pieces' },
      location: { county: 'Kajiado', town: 'Kajiado' },
      tags: ['handmade', 'maasai', 'traditional', 'jewelry'],
      specifications: { origin: 'Kajiado County', color: 'Multi-colored' }
    },
    {
      name: 'Silver Kikoy Bracelet',
      description: 'Elegant silver bracelet with traditional Kikoy fabric inlay. Perfect for any occasion.',
      price: 2500,
      category: jewelryCategory._id,
      seller: sellers[1]._id,
      images: [{ url: '/uploads/kikoy-bracelet.jpg', alt: 'Silver Kikoy Bracelet', isPrimary: true }],
      stock: { quantity: 15, unit: 'pieces' },
      location: { county: 'Mombasa', town: 'Mombasa' },
      tags: ['silver', 'kikoy', 'bracelet', 'elegant'],
      specifications: { brand: 'Coastal Crafts', color: 'Silver' }
    },

    // Toys & Games
    {
      name: 'Wooden Safari Animals Set',
      description: 'Handcrafted wooden safari animals including elephant, lion, giraffe, and rhino. Educational and fun.',
      price: 1500,
      category: toysCategory._id,
      seller: sellers[2]._id,
      images: [{ url: '/uploads/safari-animals.jpg', alt: 'Wooden Safari Animals Set', isPrimary: true }],
      stock: { quantity: 25, unit: 'pieces' },
      location: { county: 'Nairobi', town: 'Nairobi' },
      tags: ['wooden', 'educational', 'safari', 'handmade'],
      specifications: { origin: 'Kenya', weight: '500g' }
    },
    {
      name: 'Kenyan Puzzle Map',
      description: 'Educational wooden puzzle featuring the map of Kenya with all 47 counties. Great for learning.',
      price: 800,
      category: toysCategory._id,
      seller: sellers[3]._id,
      images: [{ url: '/uploads/kenya-puzzle.jpg', alt: 'Kenyan Puzzle Map', isPrimary: true }],
      stock: { quantity: 35, unit: 'pieces' },
      location: { county: 'Nakuru', town: 'Nakuru' },
      tags: ['educational', 'puzzle', 'kenya', 'learning'],
      specifications: { origin: 'Kenya', dimensions: '30x40cm' }
    },

    // Household Items
    {
      name: 'Kikoy Kitchen Towels (Set of 3)',
      description: 'Traditional Kikoy fabric kitchen towels. Highly absorbent and quick-drying.',
      price: 600,
      category: householdCategory._id,
      seller: sellers[0]._id,
      images: [{ url: '/uploads/kikoy-towels.jpg', alt: 'Kikoy Kitchen Towels', isPrimary: true }],
      stock: { quantity: 60, unit: 'pieces' },
      location: { county: 'Mombasa', town: 'Mombasa' },
      tags: ['kikoy', 'kitchen', 'absorbent', 'traditional'],
      specifications: { origin: 'Mombasa County', dimensions: '40x60cm' }
    },
    {
      name: 'Ceramic Water Filter',
      description: 'Locally made ceramic water filter that removes impurities and provides clean drinking water.',
      price: 3500,
      category: householdCategory._id,
      seller: sellers[1]._id,
      images: [{ url: '/uploads/water-filter.jpg', alt: 'Ceramic Water Filter', isPrimary: true }],
      stock: { quantity: 20, unit: 'pieces' },
      location: { county: 'Kiambu', town: 'Thika' },
      tags: ['water', 'filter', 'ceramic', 'health'],
      isFeatured: true,
      specifications: { brand: 'Pure Water Kenya', capacity: '10 liters' }
    },

    // Health & Beauty
    {
      name: 'Shea Butter Moisturizer',
      description: 'Natural shea butter moisturizer made from African shea nuts. Perfect for dry skin.',
      price: 450,
      category: healthCategory._id,
      seller: sellers[2]._id,
      images: [{ url: '/uploads/shea-butter.jpg', alt: 'Shea Butter Moisturizer', isPrimary: true }],
      stock: { quantity: 80, unit: 'pieces' },
      location: { county: 'Nairobi', town: 'Nairobi' },
      tags: ['natural', 'moisturizer', 'shea-butter', 'skincare'],
      isOrganic: true,
      specifications: { origin: 'West Africa', volume: '100ml' }
    },
    {
      name: 'Moringa Powder',
      description: 'Pure moringa powder from Kenyan moringa trees. Rich in vitamins and minerals.',
      price: 800,
      category: healthCategory._id,
      seller: sellers[3]._id,
      images: [{ url: '/uploads/moringa-powder.jpg', alt: 'Moringa Powder', isPrimary: true }],
      stock: { quantity: 45, unit: 'pieces' },
      location: { county: 'Machakos', town: 'Machakos' },
      tags: ['moringa', 'superfood', 'natural', 'vitamins'],
      isOrganic: true,
      specifications: { origin: 'Machakos County', weight: '200g' }
    },

    // Livestock & Poultry
    {
      name: 'Free Range Chicken',
      description: 'Healthy free-range chicken raised on natural feed. Fresh and tender meat.',
      price: 1200,
      category: livestockCategory._id,
      seller: sellers[0]._id,
      images: [{ url: '/uploads/free-range-chicken.jpg', alt: 'Free Range Chicken', isPrimary: true }],
      stock: { quantity: 25, unit: 'pieces' },
      location: { county: 'Kiambu', town: 'Limuru' },
      tags: ['chicken', 'free-range', 'organic', 'meat'],
      isOrganic: true,
      specifications: { weight: '2-3kg', feed: 'Natural grains' }
    },
    {
      name: 'Fresh Goat Milk',
      description: 'Pure goat milk from healthy goats. Rich in nutrients and easier to digest than cow milk.',
      price: 200,
      category: livestockCategory._id,
      seller: sellers[1]._id,
      images: [{ url: '/uploads/goat-milk.jpg', alt: 'Fresh Goat Milk', isPrimary: true }],
      stock: { quantity: 40, unit: 'liters' },
      location: { county: 'Machakos', town: 'Machakos' },
      tags: ['goat-milk', 'dairy', 'natural', 'nutritious'],
      specifications: { volume: '1 liter', freshness: 'Daily collection' }
    },

    // Crafts & Handmade
    {
      name: 'Maasai Beaded Jewelry Set',
      description: 'Authentic Maasai beaded jewelry set including necklace and bracelet. Handcrafted by Maasai artisans.',
      price: 2500,
      category: craftsCategory._id,
      seller: sellers[2]._id,
      images: [{ url: '/uploads/maasai-jewelry.jpg', alt: 'Maasai Beaded Jewelry', isPrimary: true }],
      stock: { quantity: 15, unit: 'pieces' },
      location: { county: 'Kajiado', town: 'Kajiado' },
      tags: ['maasai', 'beaded', 'handmade', 'traditional'],
      specifications: { origin: 'Maasai Community', materials: 'Glass beads, leather' }
    },
    {
      name: 'Wooden Carved Sculptures',
      description: 'Beautiful hand-carved wooden sculptures depicting African wildlife. Perfect for home decoration.',
      price: 1800,
      category: craftsCategory._id,
      seller: sellers[3]._id,
      images: [{ url: '/uploads/wooden-sculptures.jpg', alt: 'Wooden Carved Sculptures', isPrimary: true }],
      stock: { quantity: 20, unit: 'pieces' },
      location: { county: 'Kisumu', town: 'Kisumu' },
      tags: ['wooden', 'carved', 'sculpture', 'african-art'],
      specifications: { wood: 'Mahogany', height: '15-20cm' }
    }
  ];

  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(products);
  console.log('✅ Products seeded');
  return createdProducts;
};

const seedInfluencers = async (users) => {
  const influencerUsers = users.slice(0, 2); // Use first 2 users as influencers

  const influencers = [
    {
      user: influencerUsers[0]._id,
      socialMedia: {
        primaryPlatform: 'instagram',
        username: '@john_kamau_ke',
        followersCount: '10k-50k'
      },
      contentNiche: 'agriculture',
      experience: 'experienced',
      status: 'approved',
      approvalDate: new Date(),
      metrics: {
        totalEarnings: 15000,
        totalSales: 45,
        totalClicks: 1200,
        conversionRate: 3.75,
        averageOrderValue: 2500
      }
    },
    {
      user: influencerUsers[1]._id,
      socialMedia: {
        primaryPlatform: 'facebook',
        username: 'mary.wanjiku.ke',
        followersCount: '5k-10k'
      },
      contentNiche: 'food',
      experience: 'intermediate',
      status: 'approved',
      approvalDate: new Date(),
      metrics: {
        totalEarnings: 8500,
        totalSales: 28,
        totalClicks: 850,
        conversionRate: 3.29,
        averageOrderValue: 1800
      }
    }
  ];

  await Influencer.deleteMany({});
  const createdInfluencers = await Influencer.insertMany(influencers);
  console.log('✅ Influencers seeded');
  return createdInfluencers;
};

const seedData = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting data seeding...');
    
    const categories = await seedCategories();
    const users = await seedUsers();
    const products = await seedProducts(categories, users);
    const influencers = await seedInfluencers(users);
    
    console.log('✅ All data seeded successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${users.length} users`);
    console.log(`   - ${products.length} products`);
    console.log(`   - ${influencers.length} influencers`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (process.argv[1].endsWith('seedData.js')) {
  seedData();
}

export default seedData;
