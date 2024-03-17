using Dynamitey;
using Microsoft.Playwright;
using NUnit.Framework;

namespace e2e_testing_bdd.Pages;

public class ResultsPage
{
    private readonly IPage _page;
    public ResultsPage(IPage page) => _page = page;
    
    private ILocator ResultPageSuccess => _page.Locator("h1:text(\"Look who we found \ud83d\udd25\")");
    private ILocator ResultPageFail => _page.Locator("h2:text(\"Ops, something went wrong \ud83d\ude22\")");
    private ILocator ReturnButton => _page.Locator("button:text(\"Return\")");
    private ILocator ImageElement => _page.Locator("//img[contains(@class,\"avatar\")]");
    private ILocator NameElement => _page.Locator("//b[contains(text(),'Name')]//parent::p[text()]");
    private ILocator NumberOfRepositories => _page.Locator("//b[contains(text(),\"Repositories\")]//parent::p[text()]");
    private ILocator RepositoriesTitles => _page.Locator("//li[contains(@class,\"repoItem\")]/strong");
    private ILocator RepositoriesDescription => _page.Locator("//li[contains(@class,\"repoItem\")]/p");

    public async Task AssertSearchStatus(string status)
    {
        bool isVis;
        await ReturnButton.WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Visible });
        switch (status.ToUpper())
        {
            case "SUCCESS":
                isVis = await ResultPageSuccess.IsVisibleAsync();
                Assert.IsTrue(isVis, "Success search was expected.");
                break;
            case "FAIL":
                isVis = await ResultPageFail.IsVisibleAsync();
                Assert.IsTrue(isVis, "Failed search was expected.");
                break;
            default:
                Assert.Fail("Status:" +status+" is not expected.");
                break;
        }
    }

    public async Task AssertElements(Table table)
    {
        foreach (var row in table.Rows)
        {
            var elementName = row["elements"];
            await ReturnButton.WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Visible });
            ILocator? elementLocator = null;
            switch (elementName.ToUpper())
            {
                case "IMAGE":
                    elementLocator = ImageElement;
                    break;
                case "NAME":
                    elementLocator = NameElement;
                    break;
                case "NUMBER OF REPOSITORIES":
                    elementLocator = NumberOfRepositories;
                    break;
                case "REPOSITORY TITLE":
                    elementLocator = RepositoriesTitles.First;
                    break;
                case "REPOSITORY DESCRIPTION":
                    elementLocator = RepositoriesDescription.First;
                    break;
                default:
                    Assert.Fail("Element type no expected");
                    break;
            }

            var isVisible = await elementLocator?.IsVisibleAsync()!;
            if (!isVisible)
            {
                Assert.Fail("The element " + elementName + " is not visible");
            }
        }
    }

    public async Task AssertNumberOfRepositories()
    {
        var numberOfRepositories = ((await NumberOfRepositories.TextContentAsync())!).Split(" ")[1];
        var numberOfTitles = await RepositoriesTitles.CountAsync();

        if (numberOfTitles != int.Parse(numberOfRepositories!))
        {
            Console.WriteLine("Number showed: " + numberOfRepositories);
            Console.WriteLine("Number counted: " + numberOfTitles);
            Assert.Fail("The number of repositories shown is different from the ones counted");
        }

    }
}