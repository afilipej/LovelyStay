import{test,expect} from '@playwright/test';
import{SearchPage} from '../Pages/SearchPage'
import {ResultsPage} from "../Pages/ResultsPage";
import {GitHubPage} from "../Pages/GitHubPage";

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

test('Unsuccessful Search - Using Email',async ({page})=>{
    const _searchPage = new SearchPage(page);
    const _resultsPage = new ResultsPage(page);

    await page.goto('http://localhost:3000');
    await _searchPage.searchFor('hedenica@hotmail.com');
    await _resultsPage.assertSearchStatus('fail');
})

test('Unsuccessful Search - Using Name',async ({page})=>{
    const _searchPage = new SearchPage(page);
    const _resultsPage = new ResultsPage(page);

    await page.goto('http://localhost:3000');
    await _searchPage.searchFor('Hedênica Morais');
    await _resultsPage.assertSearchStatus('fail');
})

//in github documentation the usernames cannot contain special characters except for "-"
test('Unsuccessful Search - Using Special Characters',async ({page})=>{
    const _searchPage = new SearchPage(page);
    const _resultsPage = new ResultsPage(page);

    await page.goto('http://localhost:3000');
    await _searchPage.searchFor('teste@123');
    await _resultsPage.assertSearchStatus('fail');
})

test('Empty Search - Search button should be disable',async ({page})=>{
    const _searchPage = new SearchPage(page);

    await page.goto('http://localhost:3000');
    await _searchPage.assertSearchButtonBlocked();
})

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

test(`Assert Repositories Retrieved are the Same In GitLab Website`, async ({ page }) => {
    const searchPage = new SearchPage(page);
    const resultsPage = new ResultsPage(page);
    
    await page.goto('http://localhost:3000');
    await searchPage.searchFor('afilipej');
    let localRepos = await resultsPage.getRepositoriesTitlesText();
    
    const newPage = await page.context().newPage();
    const gitHubPage = new GitHubPage(newPage);
    await newPage.goto('https://github.com/afilipej', { waitUntil: 'load' });
    await gitHubPage.clickOnNavBarButton('repositories');
    let gitHubRepos = await gitHubPage.getRepositoriesTitlesText();

    localRepos.sort();
    gitHubRepos.sort();
    
    const areArraysEqual =  localRepos.every((value, index) => value === gitHubRepos[index]);

    if (!areArraysEqual) {
        throw new Error("The repositories do not match.");
    }
});

