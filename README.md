# Welcome to LovelyStay testing repositories!

In this repository, you'll see three main projects:
- `e2e_testing`
- `e2e_testing_bdd`
- `github-user-search-v1`

## Getting Started with `github-user-search-v1`

First up, let's get the `github-user-search-v1` project up and running locally:

[![Watch the video](https://i.ytimg.com/vi/kQEcpWNWhv4/maxresdefault.jpg)](https://youtu.be/kQEcpWNWhv4 "GitHub User Search v1")

## Exploring `e2e_testing`

This one features a single end-to-end test. It's a great example of how to build effective tests without diving into Behavior-Driven Development (BDD).

[![Watch the video](https://i.ytimg.com/vi/CcHS1KGp808/maxresdefault.jpg)](https://youtu.be/CcHS1KGp808 "e2e testing")

## Exploring `e2e_testing_bdd`

Next, we have the `e2e_testing_bdd` project. This one's packed with several tests, showcasing the versatility and understandability of BDD.

In the follow-up video, I walk you through:
- The feature file containing scenarios for each test:
  - Notice how the third scenario consolidates the first two into a single scenario.
  - The fourth scenario focuses solely on layout assertion.
  - The fifth scenario verifies that the number displayed for repositories matches the count.
- How to run a specific test or all tests together.

[![Watch the video](https://i.ytimg.com/vi/e8Qts_atows/maxresdefault.jpg)](https://youtu.be/e8Qts_atows "e2e testing bdd")

## Further Exploration with `e2e_testing_js`

To wrap things up, let's look at the `e2e_testing_js` project. This language is really popular at the company. So, I decided to add more tests to what I've already had in the `e2e_testing_bdd` project. I included some typical tests that you would normally do on search fields. Plus, I put together a full end-to-end flow that checks the list of repositories on the GitHub website.

[![Watch the video](https://i.ytimg.com/vi/Y3S5amPFAO4/maxresdefault.jpg)](https://youtu.be/Y3S5amPFAO4 "e2e testing js")

### Observations:
- All tests run in Chromium, but they're also compatible with other browsers.
- They execute with `Headless=false`, allowing you to see what's happening in the browser in real time. Alternatively, you can run these tests without opening the browser.
- In the last project, tests are executed in parallel, enhancing the efficiency of the testing process by reducing the overall time taken to run the entire suite.
- As shown in the video, one of the tests fails, and the reason is highlighted. This opens up a discussion point, as there's no indicator showing "X out of Y repos" or an option to navigate to different pages to explore further repositories.
- After a few searches, the app stops working. This might mean there's a problem with how it deals with a lot of searches one after the other, or maybe there's a limit in the backend or how many API calls you can make. We should look into this more to make sure the app can handle being used a lot without breaking.

Thank you.
André Jardim
