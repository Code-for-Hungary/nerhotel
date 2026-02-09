import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown";

// import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
    // Add back the basicSsl plugin and un-comment the server block
    // if you want to see access the site through HTTPS connection
    // (needed to test WebShare, location access and other web-APIs)
    // note that this will give you a self-signed certificate
    // which will result in a "security warning" page in most browsers
    // you'll need to click on "accept the risk" to access the page
    // but the https-only browser APIs will work
    plugins: [react(), mdPlugin({ mode: Mode.HTML }) /*basicSsl()*/],
    test: {
        globals: true,
        environment: "jsdom",
        restoreMocks: true,
    },
    // server: {
    //     host: true, // This is your --host flag
    //     https: true,
    // },
});
