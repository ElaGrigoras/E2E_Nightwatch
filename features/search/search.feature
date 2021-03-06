# run this feature file using one the commends below:
# npm run cucumber -- features/search/search.feature
# npm run cucumber -- features/search/search.feature --env staging


@search
Feature: Search functionality on pearson.com
    Background: User is in main page
        Given I go to pearson.com main page

    Scenario: Search box should be visible on main page
        Then The search input should be visible

    Scenario: First page with searching result should have at most 10 elements
        When I search by "Computer Science"
        Then I should see the "first" page of the search results
        And The number of results should be at most "10"

    Scenario: Clicking on Next button should display next page with 10 more results
        And I search by "Computer Science"
        When I click on Next button
        Then I should see the "next" page of the search results
        And The number of results should be at most "10"

    Scenario: Third searched element should redirect to the proper article
        And I search by "Computer Science"
        When I click on "third" article from the search results
        Then I should see the proper article

    Scenario Outline: Regardless of the opened article, I should be redirected to the proper article
        And I search by "Computer Science"
        When I click on <articleNumber> article from the search results
        Then I should see the proper article

        Examples:
            | articleNumber |
            | "second"      |
            | "third"       |
            | "fourth"      |


# I've followed the requirments, but in a real project these steps can be updated to be more generic and to test more scenarios.





