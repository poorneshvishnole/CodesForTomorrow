const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/category.model');
const Service = require('./models/service.model');

dotenv.config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

async function migrateData() {
  try {
    await Category.deleteMany({});
    await Service.deleteMany({});

    const category1 = new Category({ name: 'Technology' });
    const category2 = new Category({ name: 'Healthcare' });

    await category1.save();
    await category2.save();

    const service1 = new Service({
      categoryId: category1._id,
      name: 'Web Development',
      type: 'Normal',
      priceOptions: [
        { duration: 'Hourly', price: 50, type: 'Hourly' },
        { duration: 'Weekly', price: 300, type: 'Weekly' },
      ],
    });

    const service2 = new Service({
      categoryId: category1._id,
      name: 'SEO Optimization',
      type: 'VIP',
      priceOptions: [
        { duration: 'Monthly', price: 1500, type: 'Monthly' },
      ],
    });

    const service3 = new Service({
      categoryId: category2._id,
      name: 'Consultation',
      type: 'Normal',
      priceOptions: [
        { duration: 'Hourly', price: 100, type: 'Hourly' },
      ],
    });

    await service1.save();
    await service2.save();
    await service3.save();

    console.log('Data migration completed successfully.');
  } catch (error) {
    console.error('Error during data migration:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrateData();
