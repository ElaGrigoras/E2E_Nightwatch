Feature: Login to application
    Background:
        Given I am a registered user
        And I am on login page

    Scenario Outline: 1. Login page initial render
        Then The login screen contains these <elements>
        Examples:
            | elements             |
            | Email                |
            | Password             |
            | Login button         |
            | Forgot Password link |

    Scenario Outline: 2. Successful login
        When I fill "login" with <login>
        And I fill "password" with <correct-password>
        And I click "Login" button
        Then I should be redirected to Dashboard
        Examples:
            | login  | correct-password |
            | Luke   | ,Temp2Now!       |
            | Jackie | ,Temp2Now!       |


    Scenario Outline: 3. Unsuccessful login
        When I fill "login" with <login>
        And I fill "password" with <incorrect-password>
        And click "Login" button
        Then I am be informed about unsuccessful login
        Examples:
            | login  | incorrect-password |
            | Luke   | ,Temp2Now          |
            | Jackie | ,Temp2Now          |
            | Jackie |                    |
            |        |                    |

    Scenario: 4. Unactivated account
        When I fill "login" with <login>
        And I fill "password" with <correct-password>
        And I click "Login" button
        Then I am informd to activate my account
        Examples:
            | login | correct-password |
            | Sue   | ,Temp4Now!       |
            | John  | ,Temp4Now!       |

    Scenario: 5. Maximum number of unsuccessful login attempts
        When I fill "login" with <login>
        And I fill "password" with <incorrect-password>
        And I click "Login" button 5 times
        Then I am informed that I reached the maximum number of attempts
        And The Account is blocked for 30 minutes
        Examples:
            | login | correct-password |
            | Sue   | ,Temp4Now!       |
            | John  | ,Temp4Now!       |

    Scenario: 6. Login with the new password after changing it
        And I change the password using the Forgot Password link
        When I login using the updated password
        Then I should be redirected to Dashboard












