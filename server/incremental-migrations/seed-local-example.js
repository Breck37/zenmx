const axios = require('axios');

module.exports = {
  async up(db) {
    try {
      // const results = await axios.get('https://modern-moto-api-kpr0a8yur-brenteckert.vercel.app/api/get-all-results').then((results) => {
      //   return results.data
      // });

      // db.collection('results').insertMany(results)
      // const picks = await axios.get('https://modern-moto-api-kpr0a8yur-brenteckert.vercel.app/api/get-all-picks').then((picks) => {
      //   return picks.data
      // });

      // db.collection('picks').insertMany(picks)
      // const users = await axios.get('https://modern-moto-api-kpr0a8yur-brenteckert.vercel.app/api/get-all-users').then((users) => {
      //   return users.data
      // });

      // db.collection('users').insertMany(users)


    } catch (error) {
      console.log('ERROR running migration', { error });
      process.exit(1);
    }
  },

  down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
