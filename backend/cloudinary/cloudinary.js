// Example configuration in your backend setup (config/db.js or similar)
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'wingz',
  api_key: '453643294521992',
  api_secret: 'Tx-sDOc7kBmxSTD8jxzmuBIwp1o'
});

module.exports = cloudinary;
