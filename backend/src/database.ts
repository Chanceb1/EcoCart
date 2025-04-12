// this file sets up the database connection
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // or the path you configured
  logging: false, // Disable logging for cleaner output
});

const modelDefiners = [
    require('./models/product.js'),
];

// We define all models according to the paths we have
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize, DataTypes)
}

(async () => {
    try {
      await sequelize.sync({ force: true }); // Use force: true with caution in production
      console.log('Database synced successfully.');
    //   await sequelize.sync({ force: true })
    } catch (error) {
      console.error('Unable to sync the database:', error);
    }
  })();
  
  export default sequelize; 