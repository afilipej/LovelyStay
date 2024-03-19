import{test,expect} from '@playwright/test';
import{SearchPage} from '../Pages/SearchPage'
import {ResultsPage} from "../Pages/ResultsPage";

test('Successful Search',async ({page})=>{
    const _searchPage = new SearchPage(page);
    const _resultsPage = new ResultsPage(page);
    
    await page.goto('http://localhost:3000');
    await _searchPage.searchFor('hedenica');
    await _resultsPage.assertSearchStatus('success');
})

test('Unsuccessful Search - Non-existent user',async ({page})=>{
    const _searchPage = new SearchPage(page);
    const _resultsPage = new ResultsPage(page);

    await page.goto('http://localhost:3000');
    await _searchPage.searchFor('autoteste');
    await _resultsPage.assertSearchStatus('fail');
})

//Unsuccessful Search - using email
//Unsuccessful Search - using name
//Unsuccessful Search - using link
//Unsuccessful Search - using special characters
//Unsuccessful Search - empty search

test('Assert Layout in Results Page',async ({page})=>{
    const _searchPage = new SearchPage(page);
    const _resultsPage = new ResultsPage(page);

    await page.goto('http://localhost:3000');
    await _searchPage.searchFor('hedenica');
    await _resultsPage.assertElementVisible('image');
    await _resultsPage.assertElementVisible('number of Repositories');
    await _resultsPage.assertElementVisible('repository title');
    await _resultsPage.assertElementVisible('repository description');
})

const usernames = ['afilipej', 'teste', 'hedenica'];
usernames.forEach(username => {
    test(`Assert Number of Repositories for ${username}`, async ({ page }) => {
        const searchPage = new SearchPage(page);
        const resultsPage = new ResultsPage(page);

        await page.goto('http://localhost:3000');
        await searchPage.searchFor(username);
        await resultsPage.assertNumberOfRepositories();
    });
});

//Assert Successful Search with GitHub Integration
