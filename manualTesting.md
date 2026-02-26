## Manual testing :

## 1. The website must contain an input to accept a comma-separated list of users

I manually visited the site and confirmed that there is a text input field.
I entered:
CodeYourFuture,40thieves,SallyMcGrath.
The input field accepts comma-separated usernames correctly.

## 2. Submitting the list of users fetches data from the Codewars API about each of the users

I ran console.log()
to test if data is fetched properly for each and all useres data.
in console , JSON data is logged successfully.

## Based on the leaderboard data, a drop-down is shown, allowing the user to pick from all of the possible language rankings plus the overall ranking

After submitting multiple users, I checked the dropdown options.
I verified that:

- a dropdown is shown
- "Overall" is included
- All languages present in user ranks are included.
- The dropdown displays all available languages dynamically based on API response.

## Changing the selected ranking will update the table to reflect the newly selected ranking

I selected different languages from the dropdown.
The table updates dynamically to reflect the selected language ranking.

## The table is sorted from the highest to lowest score, top to bottom

I compared user scores manually.
Users are sorted highest to lowest score.

## Users without a ranking in a chosen language are not shown in that table

I selected a language that only some users have ranked in.

Users without ranking in that language are excluded from the table.

## The top user's score is visually highlighted ?

after submiting 3 usernames, the table shows the highest scoring user is highlighted.

## The website must score 100 for accessibility in Lighthouse

I opened Chrome DevTools → Lighthouse → Accessibility → Generate report.
The accessibility score is 100.

## Unit tests must be written for at least one non-trivial function

?
?
?
?
?
These tests verify:

- Sorting logic
- Language filtering logic
- Score calculation

All tests pass when running:

npm test
?
?
?
?
?

## Searching for a user which doesn't exist should show a message to the user explaining this.

I searched for non valid username "40thideves"
This messege displayed:
These users were not found: 40thideves

## If multiple users were searched for, it is acceptable to either just error, or to show the valid users, but the user should be made aware of the invalid users.

case 1 :
I tested 3 wrong usernames "CodeYourFutuwre,40thiweves,SahllyMcGrath"
this messege displayed allowing the user to be aware of the invalid users, which in this case all of them:
"These users were not found: CodeYourFutuwre, 40thiweves, SahllyMcGrath"
and nothing were rendered in Ranks

case 2:
I tested 3 user names "CodYourFuture,40thieves,SallyMcGrath", two correct and only one is non valid which is this one "CodYourFuture"
this error messege was displayed "These users were not found: CodYourFuture"
and the data for the other two valid usrers rendered as expected :

Username Clan Score
SallyMcGrath CodeYourFuture 1228
40thieves 10

## If fetching from the Codewars API errors (e.g. because you're offline, or made a bad request), the user must be shown a useful error message in the UI.

I tested this by turning off the internet , then entered a username then submit it .
an error meseege is displayed sayin "Network error. Please check your internet connection."
