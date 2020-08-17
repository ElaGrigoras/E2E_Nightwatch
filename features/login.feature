Feature: Login to application
    Background:
        Given I am a registered user
        And I am on login page

    Scenario Outline: Successful login
        When I fill "login" with <login>
        And I fill "password" with <correct-password>
        And I click "Login" button
        Then I should be redirected to Dashboard
        Examples:
            | login  | correct-password |
            | Luke   | ,Temp2Now!       |
            | Jackie | ,Temp2Now!       |

    Scenario Outline: Unsuccessful login
        When I fill "login" with <login>
        And I fill "password" with <incorrect-password>
        And click "Login" button
        Then I am be informed about unsuccessful login
        Examples:
            | login  | incorrect-password |
            | Luke   | ,Temp2Now          |
            | Jackie | ,Temp2Now          |

    Scenario: Unactivated account
        When I fill "login" with <login>
        And I fill "password" with <correct-password>
        And I click "Login" button
        Then I am informd to activate my account
        Examples:
            | login | correct-password |
            | Sue   | ,Temp4Now!       |
            | John  | ,Temp4Now!       |


