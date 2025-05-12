import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'src/components/**/*.cy.{js,ts,jsx,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
