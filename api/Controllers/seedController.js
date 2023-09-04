const Advertisement = require('../Models/Advertisement');
const Subscription = require('../Models/Subscription');

// Function to seed initial data
const seedData = async () => {
  try {
    // Seed advertisements with image URLs
    const advertisements = [
      {
        title: 'Ad 1',
        content: 'This is the first advertisement.',
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHO8QmHVWxETZEkQ4ZYug0SqL1LZ1UHljsyw&usqp=CAU", 
      },
      {
        title: 'Ad 2',
        content: 'This is the second advertisement.',
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHO8QmHVWxETZEkQ4ZYug0SqL1LZ1UHljsyw&usqp=CAU", 
      },
      {
        title: 'Ad 3',
        content: 'This is the third advertisement.',
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHO8QmHVWxETZEkQ4ZYug0SqL1LZ1UHljsyw&usqp=CAU", 
      },
      // Add more advertisements here
      {
        title: 'Ad 4',
        content: 'This is the fourth advertisement.',
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHO8QmHVWxETZEkQ4ZYug0SqL1LZ1UHljsyw&usqp=CAU", 
      },
      {
        title: 'Ad 5',
        content: 'This is the fifth advertisement.',
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHO8QmHVWxETZEkQ4ZYug0SqL1LZ1UHljsyw&usqp=CAU", 
      },
      // Add as many advertisements as needed
    ];

    await Advertisement.insertMany(advertisements);

    // Seed subscriptions
    const subscriptions = [
      {
        title: 'Basic Plan',
        price: 10,
        numWashes: 10,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHO8QmHVWxETZEkQ4ZYug0SqL1LZ1UHljsyw&usqp=CAU", 

      },
      {
        title: 'Standard Plan',
        price: 20,
        numWashes: 20,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHO8QmHVWxETZEkQ4ZYug0SqL1LZ1UHljsyw&usqp=CAU", 

      },
      {
        title: 'Premium Plan',
        price: 30,
        numWashes: 30,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHO8QmHVWxETZEkQ4ZYug0SqL1LZ1UHljsyw&usqp=CAU", 

      },
    ];

    await Subscription.insertMany(subscriptions);

    console.log('Dummy data seeded successfully.');
  } catch (error) {
    console.error('Error seeding dummy data:', error);
  }
};

module.exports = {
  seedData,
};
