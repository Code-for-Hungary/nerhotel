import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown";

import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), mdPlugin({ mode: Mode.HTML }), basicSsl()],
    test: {
        globals: true,
        environment: "jsdom",
        restoreMocks: true,
    },
    server: {
        host: true, // This is your --host flag
        https: true,
    },
});
