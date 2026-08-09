const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000/Organization-Website',
        specPattern: ['e2e/**/*.cy.js', 'smoke/**/*.cy.js'],
        screenshotsFolder: 'screenshots',
        videosFolder: 'videos',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        supportFile: false,
    },
});
