Feature: GitSearchApp

    Scenario: Successful Search
        Given I navigate to the app
        When search for "hedenica"
        Then I should see the "success" message

    Scenario: Unsuccessful Search
        Given I navigate to the app
        When search for "autoteste"
        Then I should see the "fail" message

    Scenario Outline: Search
        Given I navigate to the app
        When search for "<search>"
        Then I should see the "<result>" message

        Examples:
          | search    | result  |
          | hedenica  | success |
          | autoteste | fail    |
          
    Scenario: Assert Layout in Results Page
        Given I navigate to the app
        When search for "hedenica"
        Then I verify the following elements are present
        | elements               |
        | image                  |
        | name                   |
        | number of Repositories |
        | repository title       |
        | repository description |
        
    Scenario Outline: Assert Number of Repositories
        Given I navigate to the app
        When search for "<username>"
        Then the number of repositories should be the same listed
        
        Examples:
        | username        |
        | afilipej        |
        | teste           |
        | hedenica        |
        