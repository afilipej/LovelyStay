const { expect } = require('@playwright/test');

exports.ResultsPage=class ResultsPage {
    constructor(page) {
        this.page = page;
        this.resultPageSuccess = page.locator('h1:text("Look who we found 🔥")');
        this.resultPageFail = page.locator('h2:text("Ops, something went wrong 😢")');
        this.returnButton = page.locator('button:text("Return")');
        this.imageElement = page.locator('//img[contains(@class,"avatar")]');
        this.nameElement = page.locator("//b[contains(text(),'Name')]//parent::p[text()]");
        this.numberOfRepositories = page.locator('//b[contains(text(),"Repositories")]//parent::p[text()]');
        this.repositoriesTitles = page.locator('//li[contains(@class,"repoItem")]/strong');
        this.repositoriesDescription = page.locator('//li[contains(@class,"repoItem")]/p');
    }

    async assertSearchStatus(status) {
        await this.returnButton.waitFor({ state: 'visible' });
        let isVis;
        switch (status.toUpperCase()) {
            case 'SUCCESS':
                isVis = await this.resultPageSuccess.isVisible();
                expect(isVis).toBeTruthy();
                break;
            case 'FAIL':
                isVis = await this.resultPageFail.isVisible();
                expect(isVis).toBeTruthy();
                break;
            default:
                throw new Error(`Status: ${status} is not expected.`);
        }
    }

    async assertElementVisible(elementName) {
        await this.returnButton.waitFor({ state: 'visible' });
        let elementLocator;
        switch (elementName.toUpperCase()) {
            case 'IMAGE':
                elementLocator = this.imageElement;
                break;
            case 'NAME':
                elementLocator = this.nameElement;
                break;
            case 'NUMBER OF REPOSITORIES':
                elementLocator = this.numberOfRepositories;
                break;
            case 'REPOSITORY TITLE':
                elementLocator = this.repositoriesTitles.first();
                break;
            case 'REPOSITORY DESCRIPTION':
                elementLocator = this.repositoriesDescription.first();
                break;
            default:
                throw new Error(`Element type ${elementName} not expected.`);
        }

        const isVisible = await elementLocator.isVisible();
        if (!isVisible) {
            throw new Error(`The element ${elementName} is not visible.`);
        }
        
        expect(isVisible).toBeTruthy();
    }

    
    async assertNumberOfRepositories() {
        const numberOfRepositories = (await this.numberOfRepositories.textContent()).split(' ')[1];
        const numberOfTitles = await this.repositoriesTitles.count();

        if (numberOfTitles !== parseInt(numberOfRepositories)) {
            console.log(`Number showed: ${numberOfRepositories}`);
            console.log(`Number counted: ${numberOfTitles}`);
            throw new Error('The number of repositories shown is different from the ones counted');
        }
    }
}

