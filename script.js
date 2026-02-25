import { fetchUserData, getLanguagesNames } from "./logic.js";

let usersData = [];
let languagesNames = [];
let selectedLanguage = "overall";
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
let userNamesArray = [];

submitButton.addEventListener("click", () => {
  let userInputData = usernameInput.value;
  if (userInputData) {
    userNamesArray = userInputData.split(",");
    // console.log(userNamesArray);
    output.textContent += userNamesArray.join(" - ") + "\n"; //just for teesting
    // fetchUserData(all users here )
    handleFetchUsersData(userNamesArray);
  } else {
    console.log("no username entered!");
  }
});

//-------------- Fetch User Data  ----------------------

// done in logic.js loadUserData function

//Promise.all([Promise, Promise, Promise]) >> runs them all then wait for them to finish then return data for each in an array  []
async function handleFetchUsersData(userNamesArray) {
  const promises = userNamesArray.map((user) => {
    return fetchUserData(user);
  });
  usersData = await Promise.all(promises);
  console.log("usersData: ", usersData);
  languagesNames = getLanguagesNames(usersData);
  makeLangsSelect(usersData);
  renderRanks(usersData, "overall");
}

//----------- Select for languages ------------

const select = document.getElementById("languageSelect");

function makeLangsSelect() {
  select.innerHTML = "";
  const overallOption = document.createElement("option");
  overallOption.value = "overall";
  overallOption.textContent = "overall";
  select.appendChild(overallOption);

  languagesNames.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang;
    option.textContent = lang;
    select.appendChild(option);
  });
  console.log("line 58");
  console.log(languagesNames);
}

select.addEventListener("change", () => {
  selectedLanguage = select.value;
  console.log("Selected language:", selectedLanguage);
  renderRanks(usersData, selectedLanguage);
});

function renderRanks(usersData, selectedLanguage) {
  usersData = sortUsersDataByScore();
  //render for multiple users and any lang
  const languageNamesforuser = getLanguagesNames(usersData);
  console.log("languageNamesforuser: ", languageNamesforuser);
  const tableBody = document.querySelector("tbody");

  tableBody.innerHTML = "";
  //will need to sort the usersData

  for (let user = 0; user < usersData.length; user++) {
    if (selectedLanguage === "overall") {
      console.log("Overall is selected");
      // Clear existing rows
      // tableBody.innerHTML = "";
      const row = document.createElement("tr");
      tableBody.appendChild(row);

      const usernameCell = document.createElement("td");
      const clanCell = document.createElement("td");
      const scoreCell = document.createElement("td");

      usernameCell.textContent = usersData[user].username;
      clanCell.textContent = usersData[user].clan;
      scoreCell.textContent = usersData[user].ranks.overall.score;

      row.appendChild(usernameCell);
      row.appendChild(clanCell);
      row.appendChild(scoreCell);
      if (user === 0) {
        row.className = "top-user";
      }
    } else if (usersData[user].ranks.languages[selectedLanguage]) {
      console.log("Language is valid:", selectedLanguage);

      const row = document.createElement("tr");
      tableBody.appendChild(row);

      const usernameCell = document.createElement("td");
      const clanCell = document.createElement("td");
      const scoreCell = document.createElement("td");

      usernameCell.textContent = usersData[user].username;
      clanCell.textContent = usersData[user].clan;
      scoreCell.textContent =
        usersData[user].ranks.languages[selectedLanguage].score;

      row.appendChild(usernameCell);
      row.appendChild(clanCell);
      row.appendChild(scoreCell);
      if (user === 0) {
        row.className = "top-user";
      }
    } else {
      console.log("Language is not valid:", selectedLanguage);
    }
  }

  //this renders for one user - any language
}

function sortUsersDataByScore() {
  if (selectedLanguage === "overall") {
    console.log("Sorting by overall score");
  } else {
    console.log(`Sorting by ${selectedLanguage} score`);
  }
  return usersData.sort((a, b) => {
    // const scoreA =
    //   selectedLanguage === "overall"
    //     ? a.ranks.overall.score
    //     : a.ranks.languages[selectedLanguage].score;
    // const scoreB =
    //   selectedLanguage === "overall"
    //     ? b.ranks.overall.score
    //     : b.ranks.languages[selectedLanguage].score;
    const scoreA = a.ranks.overall.score;
    const scoreB = b.ranks.overall.score;
    return scoreB - scoreA; // Sort in descending order
  });
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

onload = renderRanks(usersData, "overall");
//function for returning the username , clan and score for overall for now == done
//then each language later == done

//3-  You show a leaderboard table == done for one user
//whats required to show?? username , clan and score == done for any selected lang and one user

// 4- User can switch between overall rank and language ranks == done
