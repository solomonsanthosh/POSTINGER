var cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({ 
    cloud_name: 'dqx0eyiow', 
    api_key: '469344161745916', 
    api_secret: 'Osuo6GsBn2QUkVPuZi8njErKZ5k',
    secure: true
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'postinger',
		allowedFormats: ['jpeg', 'png', 'jpg']
	}
});

module.exports = {
	cloudinary,
	storage
};
