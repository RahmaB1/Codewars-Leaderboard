import { fetchUserData, getLanguagesNames } from "./logic.js";

//1-  User types Codewars usernames
//done for only one user, need to add multiple users
//Your website should display an input,
// allowing the user to add a comma-separated list of Codewars usernames
//  (e.g. "CodeYourFuture,40thieves,SallyMcGrath")
// that they want to display on the leaderboard.

//------------------------------------
const usernameInput = document.getElementById("usernameInput");
const submitButton = document.getElementById("submitButton");
// let username = "";
const userNamesArray = [];
const output = document.getElementById("output");

submitButton.addEventListener("click", function () {
  if (usernameInput.value) {
    userNamesArray.push(usernameInput.value);
    output.textContent += usernameInput.value + "\n";
    console.log(userNamesArray);
  }
});

//------------------------------------
// 2- You fetch their data from the Codewars API
// done in logic.js loadUserData function , again for only one user
const userData = await fetchUserData("SallyMcGrath");

//function for only languages so that it can be used in select

const languagesNames = getLanguagesNames(userData);
console.log(languagesNames);
const select = document.getElementById("languageSelect");
//creating options
languagesNames.map((lang) => {
  const option = document.createElement("option");
  option.value = lang;
  option.textContent = lang;
  select.appendChild(option);
});

//function for returning the username , clan and score for overall for now
//then each language later

//3-  You show a leaderboard table
//whats required to show??

// 4- User can switch between overall rank and language ranks
