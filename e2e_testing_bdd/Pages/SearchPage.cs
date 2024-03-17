using Microsoft.Playwright;

namespace e2e_testing_bdd.Pages;

public class SearchPage
{
    private IPage _page;
    public SearchPage(IPage page) => _page = page;
    
    private ILocator SearchPageTitle => _page.Locator("h1:text(\"Search for a user\")");
    private ILocator SearchInput => _page.Locator("input[name='username']");
    private ILocator SearchButton => _page.Locator("button:text(\"search\")");


    public async Task SearchFor(string searchTerm)
    {
        await SearchPageTitle.WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Visible });
        await SearchInput.FillAsync(searchTerm);
        await SearchButton.ClickAsync();
    }
}