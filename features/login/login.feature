# These are some of the test cases I would test for login functionality

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
        Then I am redirected to Dashboard
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
        When I fill "login" with <unactivated-login>
        And I fill "password" with <correct-password>
        And I click "Login" button
        Then I am informd to activate my account
        Examples:
            | unactivated-login | correct-password |
            | Sue               | ,Temp4Now!       |
            | John              | ,Temp4Now!       |

    Scenario: 5. Deactivated account
        When I fill "login" with <deactivated-login>
        And I fill "password" with <correct-password>
        And I click "Login" button
        Then I am informd about unsuccessful login
        Examples:
            | deactivated-login | correct-password |
            | Ela               | ,Temp4Now!       |

    Scenario: 6. Maximum number of unsuccessful login attempts
        When I fill "login" with <login>
        And I fill "password" with <incorrect-password>
        And I click "Login" button 5 times
        Then I am informed that I've reached the maximum number of attempts
        And The Account is blocked for 30 minutes
        Examples:
            | login | correct-password |
            | Sue   | ,Temp4Now!       |
            | John  | ,Temp4Now!       |

    Scenario: 7. Login with the new password after changing it
        When I change the password using the Forgot Password link
        And I fill "login" with <login>
        And I fill "password" with <updated-password>
        And I click "Login" button
        Then I am redirected to Dashboard
        Examples:
            | login | updated-password |
            | Luke  | ,Updated4Now!    |

    Scenario: 8. Password is encrypted * when entered
        When I type the password
        Then Each character typed is encrypted using *

        Examples:
            | login | updated-password |
            | Luke  | ,Updated4Now!    |

    Scenario: 9. SQL Injection Protection
        When I fill "login" with <incorrect-login>
        And I fill "password" with <password>
        And I click "Login" button
        Then I'm not logged in
        And I am informd about unsuccessful login

        Examples:
            | incorrect-login | password   |
            | 'or 1=1 --      | ,Temp4Now! |

    Scenario: 10. Performance
        When I fill "login" with <correct-login>
        And I fill "password" with <correct-password>
        And I click "Login" button
        Then I'm redirected to Dashboard in less than 2 seconds
        Examples:
            | correct-login | correct-password |
            | Luke          | ,Temp2Now!       |








