const sequelize = require('../config/connection');
const { User, Post } = require('../models');
// const { User, Post } = require('/Users/davidhardin/Desktop/ch/ch14/models');
// const User = require('/Users/davidhardin/Desktop/ch/ch14/models/User');
// const Post = require('/Users/davidhardin/Desktop/ch/ch14/models/Post');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
