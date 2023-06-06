module.exports = {
    plugins: {
        tailwindcss: {
            // pick the tailwind config file you want to use
            config: './src/styles/tailwind/default.js',
            //config: './src/styles/tailwind/rainbow.js'
            // config: './src/styles/tailwind/dark.js'
        },
        autoprefixer: {},
    },
};
