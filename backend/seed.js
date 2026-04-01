const { sequelize, User, Product } = require('./models/database');
const bcrypt = require('bcryptjs');

const seedProducts = [
  {
    name: 'iPhone 13 Pro Max - 128GB - Excellent Condition',
    description: 'Used for 10 months. No scratches. Box and charger included.',
    price: 55000,
    imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&q=80',
    category: 'Mobiles',
    location: 'Andheri West, Mumbai'
  },
  {
    name: 'Maruti Suzuki Swift VXI (2018)',
    description: 'Single owner, petrol, 40,000 km driven. Insurance valid till Dec 2026.',
    price: 450000,
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80',
    category: 'Cars',
    location: 'Koramangala, Bengaluru'
  },
  {
    name: 'Teak Wood Dining Table with 6 Chairs',
    description: 'Solid teak wood dining table set. 3 years old but looks brand new. Moving out sale.',
    price: 18000,
    imageUrl: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500&q=80',
    category: 'Furniture',
    location: 'Vasant Kunj, New Delhi'
  },
  {
    name: 'Sony PlayStation 5 (Disc Edition)',
    description: 'Selling my PS5 with 2 controllers and 3 games (FIFA 23, Spider-Man, GoW). Negotiable.',
    price: 42000,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80',
    category: 'Electronics & Appliances',
    location: 'Bandra Bandstand, Mumbai'
  },
  {
    name: 'Royal Enfield Classic 350',
    description: 'Well maintained, stealth black. 2021 model, 15,000 km. Regularly serviced.',
    price: 185000,
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&q=80',
    category: 'Bikes',
    location: 'Anna Nagar, Chennai'
  },
  {
    name: 'LG 1.5 Ton 5 Star Inverter Split AC',
    description: 'Copper condenser. Cooling perfectly. Have to sell because transferring to another city.',
    price: 22000,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
    category: 'Electronics & Appliances',
    location: 'Sector 50, Noida'
  }
];

async function runSeed() {
  try {
    await sequelize.sync({ force: true }); // Reset DB
    console.log('Database synced');

    const hashedPassword = await bcrypt.hash('password123', 10);
    const demoUser = await User.create({
      name: 'Demo Seller',
      email: 'seller@demo.com',
      password: hashedPassword
    });

    const productsWithUser = seedProducts.map(p => ({ ...p, userId: demoUser.id }));
    
    await Product.bulkCreate(productsWithUser);
    console.log('Database seeded with user and products');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed:', error);
    process.exit(1);
  }
}

runSeed();
