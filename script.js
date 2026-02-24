import { fetchUserData } from "./logic.js";

//1-  User types Codewars usernames
//done for only one user, need to add multiple users

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

// 2- You fetch their data from the Codewars API
// done in logic.js loadUserData function , again for only one user

//3-  You show a leaderboard table
//whats required to show??

// 4- User can switch between overall rank and language ranks
