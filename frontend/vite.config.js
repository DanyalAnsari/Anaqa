import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [tailwindcss(), react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "https://your-backend.com",
				changeOrigin: true,
				secure: true,
				cookieDomainRewrite: {
					"*": "localhost",
				},
			},
		},
	},
	base: "/",
	build: {
		outDir: "./dist",
		emptyOutDir: true,
	},
});
