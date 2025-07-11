import logger from "#utils/logger";
import fs from "fs/promises";
import path from "path";

const FileHandler = {
	// Helper function to save uploaded files locally
	_saveProductImages: async (files) => {
		const uploadDir = path.join(process.cwd(), "public", "images", "products");

		// Ensure upload directory exists
		try {
			await fs.access(uploadDir);
		} catch {
			await fs.mkdir(uploadDir, { recursive: true });
		}

		const savedImages = [];
		const imageFields = ["image1", "image2", "image3", "image4"];

		for (const field of imageFields) {
			if (files[field]?.[0]) {
				const file = files[field][0];
				const fileName = `${file.originalname}`;
				const filePath = path.join(uploadDir, fileName);

				// Move file from temp location to public folder
				await fs.rename(file.path, filePath);

				// Store relative URL for database
				savedImages.push(`/images/products/${fileName}`);
			}
		}

		return savedImages;
	},

	// Helper function to delete image files
	_deleteProductImages: async (imageUrls) => {
		if (!imageUrls?.length) return;

		const deletePromises = imageUrls.map(async (imageUrl) => {
			try {
				const filePath = path.join(process.cwd(), "public", imageUrl);
				await fs.unlink(filePath);
			} catch (error) {
				logger.error(`Failed to delete image: ${imageUrl}`, error);
			}
		});

		await Promise.allSettled(deletePromises);
	},
};

export default FileHandler;
