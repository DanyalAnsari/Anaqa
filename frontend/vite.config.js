import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);

export default defineConfig({
	plugins: [tailwindcss(), react()],
	resolve: {
		alias: [
			...[
				"assets",
				"components",
				"config",
				"constants",
				"hooks",
				"pages",
				"styles",
			].map((folder) => ({
				find: `@${folder}`,
				replacement: path.resolve(__dirname, `./src/${folder}`),
			})),
			{
				find: "@",
				replacement: path.resolve(__dirname, "./src/"),
			},
		],
	},
	server: {
		port: 5173,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
			},
		},
	},
});
