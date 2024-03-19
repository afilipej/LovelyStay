const { expect } = require('@playwright/test');
exports.SearchPage = class SearchPage {
    constructor(page) {
        this.page = page;
        this.searchPageTitle = page.locator('h1:text("Search for a user")');
        this.searchInput = page.locator('input[name="username"]');
        this.searchButton = page.locator('button:text("search")');
    }
    
    async searchFor(searchTerm) {
        await this.searchPageTitle.waitFor({ state: 'visible' });
        await this.searchInput.fill(searchTerm);
        await this.searchButton.click();
    }
}
