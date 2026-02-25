import { fetchUserData, getLanguagesNames } from "./logic.js";

const userData = {
  id: "6067119dfbf00e000f893e74",
  username: "SallyMcGrath",
  name: "Sally McGrath",
  honor: 1025,
  clan: "CodeYourFuture",
  leaderboardPosition: 35400,
  skills: [],
  ranks: {
    overall: {
      rank: -4,
      name: "4 kyu",
      color: "blue",
      score: 1228,
    },
    languages: {
      javascript: {
        rank: -4,
        name: "4 kyu",
        color: "blue",
        score: 1224,
      },
      sql: {
        rank: -8,
        name: "8 kyu",
        color: "white",
        score: 4,
      },
      typescript: {
        rank: -8,
        name: "8 kyu",
        color: "white",
        score: 2,
      },
    },
  },
  codeChallenges: {
    totalAuthored: 0,
    totalCompleted: 187,
  },
};

//1-  User types Codewars usernames
//done for only one user, need to add multiple users
//Your website should display an input,
// allowing the user to add a comma-separated list of Codewars usernames
//  (e.g. "CodeYourFuture,40thieves,SallyMcGrath")
// that they want to display on the leaderboard.

//------------- Input User Name -----------------------
const usernameInput = document.getElementById("usernameInput");
const submitButton = document.getElementById("submitButton");
const output = document.getElementById("output");
// let username = "";
const userNamesArray = [];

submitButton.addEventListener("click", () => {
  if (usernameInput.value) {
    userNamesArray.push(usernameInput.value);
    output.textContent += usernameInput.value + "\n"; //just for teesting
    console.log(userNamesArray);
  } else {
    console.log("no username entered!");
  }
});

//-------------- Fetch User Data  ----------------------

// 2- You fetch their data from the Codewars API
// done in logic.js loadUserData function , again for only one user

// const userData = await fetchUserData("SallyMcGrath"); // will change to user name entered by user

//----------- Select for languages ------------
const languagesNames = getLanguagesNames(userData);
const select = document.getElementById("languageSelect");
let selectedLanguage = "overall";

languagesNames.forEach((lang) => {
  const option = document.createElement("option");
  option.value = lang;
  option.textContent = lang;
  select.appendChild(option);
});

select.addEventListener("change", () => {
  selectedLanguage = select.value;
  console.log("Selected language:", selectedLanguage);
  handleSelectedLanguage(selectedLanguage);
});

function handleSelectedLanguage(language) {
  renderRanks(language);
}

function renderRanks(language) {
  //this now renders for any language
  const languageNamesforuser = getLanguagesNames(userData);
  const tableBody = document.querySelector("tbody");

  tableBody.innerHTML = "";

  if (language === "overall") {
    console.log("Overall is selected");
    // Clear existing rows
    // tableBody.innerHTML = "";
    const row = document.createElement("tr");
    tableBody.appendChild(row);

    const usernameCell = document.createElement("td");
    const clanCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    usernameCell.textContent = userData.username;
    clanCell.textContent = userData.clan;
    scoreCell.textContent = userData.ranks.overall.score;

    row.appendChild(usernameCell);
    row.appendChild(clanCell);
    row.appendChild(scoreCell);
  } else if (languageNamesforuser.includes(language)) {
    console.log("Language is valid:", language);

    const row = document.createElement("tr");
    tableBody.appendChild(row);

    const usernameCell = document.createElement("td");
    const clanCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    usernameCell.textContent = userData.username;
    clanCell.textContent = userData.clan;
    scoreCell.textContent = userData.ranks.languages[language].score;

    row.appendChild(usernameCell);
    row.appendChild(clanCell);
    row.appendChild(scoreCell);
  } else {
    console.log("Language is not valid:", language);
  }
}

function renderRankstest() {
  // will try the overall first

  const tableBody = document.querySelector("tbody");
  // Clear existing rows
  const row = document.createElement("tr");
  tableBody.appendChild(row);

  const usernameCell = document.createElement("td");
  const clanCell = document.createElement("td");
  const scoreCell = document.createElement("td");

  usernameCell.textContent = userData.username;
  clanCell.textContent = userData.clan;
  scoreCell.textContent = userData.ranks.overall.score;

  row.appendChild(usernameCell);
  row.appendChild(clanCell);
  row.appendChild(scoreCell);
}

onload = renderRanks("overall");
//function for returning the username , clan and score for overall for now == done
//then each language later == done

//3-  You show a leaderboard table == done for one user
//whats required to show?? username , clan and score == done for any selected lang and one user

// 4- User can switch between overall rank and language ranks == done
