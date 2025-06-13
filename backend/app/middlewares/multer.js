import multer from "multer";

const upload = multer({
	dest: "temp/", // temporary directory
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb(new Error("Only image files allowed"));
		}
	},
});

export default upload