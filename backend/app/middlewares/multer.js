import multer from "multer";

const storage = multer.diskStorage({
	destination: "public/images",
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	},
});

const upload = multer({
	storage,
});

module.exports = upload;
