const { expect } = require('@playwright/test');

exports.GitHubPage=class GitHubPage {
    constructor(page) {
        this.page = page;
        this.navBar = page.locator('//nav[contains(@class,"Nav")]');
        this.returnButton = page.locator('button:text("Return")');
        this.repositoriesTitles = page.locator('//div[@id=\'user-repositories-list\']//li//a[@itemprop]');
        this.repositoriesDescription = page.locator('//li[contains(@class,"repoItem")]/p');
    }

    async clickOnNavBarButton(button) {
        const num = await this.navBar.count();
        let isVisible = false;
        let i;
        for (i=0; i < num; i++) {
            if (await this.navBar.nth(i).isVisible()) {
                isVisible = true;
                break;
            }
        }
        await this.navBar.nth(i).locator('//a[contains(@data-tab-item,\''+button.toLowerCase()+'\')]').click();
    }

    async getRepositoriesTitlesText() {
        await this.repositoriesTitles.first().waitFor({ state: 'visible' });
        let titlesText = [];
        const num = await this.repositoriesTitles.count();
        for (let i = 0; i < num; i++) {
            const titleText = await this.repositoriesTitles.nth(i).getAttribute('href');
            titlesText.push(titleText.trim().substring(1));
        }
        return titlesText;
    }
}