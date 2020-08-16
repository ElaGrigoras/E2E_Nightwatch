# npm run cucumber -- features/search.feature
@search
Feature: Search
    Background: User is in main page
        Given I go to pearson.com main page

    #Scenario: Search input should be visible on main page
    #Then The search input should be visible

    #Scenario: First page with searching result should have at most 10 elements
    #When I search by "Computer Science"
    #Then I should see the first page of the search results
    #And The number of results should be at most "10"

    #Scenario: Clicking on Next button should display next page with 10 more result.
    #And I search by "Computer Science"
    #When I click on Next button
    #Then I should see the next page displayed
    #And The number of results should be at most "10"

    Scenario: Third searched element should redirect to the proper article.
        And I search by "Computer Science"
        When I click on "third" article from the search results
        Then I should see the proper article

    Scenario Outline: Regardless of the open article, I should redirect to the proper article.
        And I search by "Computer Science"
        When I click on <articleNumber> article from the search results
        Then I should see the proper article

        Examples:
            | articleNumber |
            | "second"      |
            | "third"       |
            | "fourth"      |








