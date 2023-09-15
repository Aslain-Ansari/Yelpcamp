const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
       const camp = new Campground({
            author:"64da5791eb9b7b7a73f7cde8",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'All about camping around the whole country,come with us and relax your mind.',
            price,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/drkejouwx/image/upload/v1692273857/YelpCamp/eos1xkqgjmqyagvo2fks.jpg',
                  filename: 'YelpCamp/eos1xkqgjmqyagvo2fks'
                },
                {
                  url: 'https://res.cloudinary.com/drkejouwx/image/upload/v1692273857/YelpCamp/e2d53dkwkpgylc06ruqi.jpg',
                  filename: 'YelpCamp/e2d53dkwkpgylc06ruqi'
                }
              ]
        })
        await camp.save();
    }

}

seedDb().then(() => {
    mongoose.connection.close();
})