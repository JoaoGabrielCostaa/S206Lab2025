const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://globalsqa.com/angularJs-protractor/registration-login-example/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
