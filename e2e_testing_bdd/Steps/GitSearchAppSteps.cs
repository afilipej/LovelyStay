using e2e_testing_bdd.Drivers;
using e2e_testing_bdd.Pages;

namespace e2e_testing_bdd.Steps;

[Binding]
public sealed class GitSearchAppSteps
{
    private readonly Driver _driver;

    private readonly SearchPage _searchPage;
    private readonly ResultsPage _resultsPage;
    
    public GitSearchAppSteps(Driver driver)
    {
        _driver = driver;
        _searchPage = new SearchPage(_driver.Page);
        _resultsPage = new ResultsPage(_driver.Page);
    }

    [Given(@"I navigate to the app")]
    public void GivenINavigateToTheApp()
    {
        _driver.Page.GotoAsync("http://localhost:3000/");
    }

    [When(@"search for ""(.*)""")]
    public async Task WhenSearchFor(string searchTerm)
    {
        await _searchPage.SearchFor(searchTerm);
    }

    [Then(@"I should see the ""(.*)"" message")]
    public async Task ThenIShouldSeeTheMessage(string status)
    {
        await _resultsPage.AssertSearchStatus(status);
    }

    [Then(@"I verify the following elements are present")]
    public async Task ThenIVerifyTheFollowingElementsArePresent(Table table)
    {
        await _resultsPage.AssertElements(table);
    }

    [Then(@"the number of repositories should be the same listed")]
    public async Task ThenTheNumberOfRepositoriesShouldBeTheSameListed()
    {
        await _resultsPage.AssertNumberOfRepositories();
    }
}