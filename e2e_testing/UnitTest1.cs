using Microsoft.Playwright;
using NUnit.Framework;
using System.Threading.Tasks;

namespace e2e_testing
{
    public class Tests
    {
        private IPlaywright _playwright;
        private IBrowser _browser;
        private IPage _page;
        
        private ILocator SearchPageTitle => _page.Locator("h1:text(\"Search for a user\")");
        private ILocator ResultPageSucess => _page.Locator("h1:text(\"Look who we found \ud83d\udd25\")");
        private ILocator ResultPageFail => _page.Locator("h2:text(\"Ops, something went wrong \ud83d\ude22\")");
        private ILocator SearchInput => _page.Locator("input[name='username']");
        private ILocator SearchButton => _page.Locator("button:text(\"search\")");
        private ILocator ReturnButton => _page.Locator("button:text(\"Return\")");

        [SetUp]
        public async Task Setup()
        {
            _playwright = await Playwright.CreateAsync();
            _browser = await _playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
            {
                Headless = false
            });
            _page = await _browser.NewPageAsync();
            await _page.GotoAsync("http://localhost:3000/");
        }
        
        // This framework will contain just one test case that asserts that we can do successful and an unsuccessful search.
        [Test]
        public async Task E2Eflow()
        {
            //Assert elements in search page
            bool isVis = await SearchPageTitle.IsVisibleAsync();
            Assert.IsTrue(isVis, "Search Page Title is not visible");
            isVis = await SearchInput.IsVisibleAsync();
            Assert.IsTrue(isVis, "Search input is not visible");
            isVis = await SearchButton.IsVisibleAsync();
            Assert.IsTrue(isVis, "Search input is not visible");
            
            await _page.ScreenshotAsync(new PageScreenshotOptions
            {
                Path = "../../../Screenshots/SearchPageElements.jpg"
            });
            
            //Successful Search
            await SearchInput.FillAsync("hedenica");
            await SearchButton.ClickAsync();
            //Assert elements in results page
            await ReturnButton.WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Visible });
            
            isVis = await ResultPageSucess.IsVisibleAsync();
            Assert.IsTrue(isVis, "Success search was expected");
            await _page.ScreenshotAsync(new PageScreenshotOptions
            {
                Path = "../../../Screenshots/SearchResultSuccess.jpg"
            });
            await ReturnButton.ClickAsync();
            await SearchButton.WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Visible });
            
            //Unsuccessful Search
            await SearchInput.FillAsync("autoteste");
            await SearchButton.ClickAsync();
            //Assert elements in results page
            await ReturnButton.WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Visible });
            isVis = await ResultPageFail.IsVisibleAsync();
            Assert.IsTrue(isVis, "Success search was expected");
            await _page.ScreenshotAsync(new PageScreenshotOptions
            {
                Path = "../../../Screenshots/SearchResultUnsuccessful.jpg"
            });
        }

        [TearDown]
        public async Task Teardown()
        {
            await _page.CloseAsync();
            await _browser.CloseAsync();
            _playwright.Dispose();
        }
    }
}