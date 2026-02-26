import {
  fetchUserData,
  getLanguagesNames,
  sortUsersDataByScore,
} from "./logic.js";

let usersData = [];
let nonValidUsers = [];
let languagesNamesFromAll = [];
let selectedLanguage = "overall";
const errorDiv = document.getElementById("error");

//------------- Input User Name -----------------------
const usernameInput = document.getElementById("usernameInput");
const submitButton = document.getElementById("submitButton");
const output = document.getElementById("output");
let userNamesArray = [];

submitButton.addEventListener("click", () => {
  let userInputData = usernameInput.value;
  errorDiv.innerHTML = "";
  if (userInputData) {
    userNamesArray = userInputData.split(",");
    usersData = [];
    handleFetchUsersData(userNamesArray);
  } else {
    showError("no username entered!", "");
  }
});

//-------------- Fetch User Data  ----------------------

async function handleFetchUsersData(userNamesArray) {
  const promises = userNamesArray.map((user) => {
    return fetchUserData(user);
  });
  const results = await Promise.all(promises);
  nonValidUsers = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i].response) {
      if (results[i].response.status === 200) {
        usersData.push(results[i].data);
      } else if (results[i].response.status === 404) {
        nonValidUsers.push(results[i].username);
        showError(results[i].errorMessege, results[i].username);
        console.log(showError(results[i].errorMessege, results[i].username));
      }
    } else {
      const errorMessege =
        "Network error. Please check your internet connection.";
      showError(errorMessege);
    }
  }
  if (nonValidUsers.length > 0) {
    let messege = "these usernames were not found: ";
    let names = nonValidUsers.join(", ");
    showError(messege, names);
  }
  languagesNamesFromAll = getLanguagesNames(usersData);
  makeLangsSelect(usersData);
  renderRanks(usersData, "overall");
}

//----------- Select languages ------------

const select = document.getElementById("languageSelect");

function makeLangsSelect() {
  select.innerHTML = "";
  const overallOption = document.createElement("option");
  overallOption.value = "overall";
  overallOption.textContent = "overall";
  select.appendChild(overallOption);

  languagesNamesFromAll.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang;
    option.textContent = lang;
    select.appendChild(option);
  });
}

select.addEventListener("change", () => {
  selectedLanguage = select.value;
  renderRanks();
});

function renderRanks() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  if (selectedLanguage === "overall") {
    //sort then loop and render
    usersData = sortUsersDataByScore(usersData, selectedLanguage);
    for (let user = 0; user < usersData.length; user++) {
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
      if (usersData.length > 1 && user === 0) {
        row.className = "top-user";
      }
    }
  } else {
    const filteredDataByLang = usersData.filter(
      (data) => data.ranks.languages[selectedLanguage],
    );
    const newsorted = sortUsersDataByScore(
      filteredDataByLang,
      selectedLanguage,
    );

    for (let user = 0; user < newsorted.length; user++) {
      const row = document.createElement("tr");
      tableBody.appendChild(row);

      const usernameCell = document.createElement("td");
      const clanCell = document.createElement("td");
      const scoreCell = document.createElement("td");

      usernameCell.textContent = newsorted[user].username;
      clanCell.textContent = newsorted[user].clan;
      scoreCell.textContent =
        newsorted[user].ranks.languages[selectedLanguage].score;

      row.appendChild(usernameCell);
      row.appendChild(clanCell);
      row.appendChild(scoreCell);
      if (newsorted.length > 1 && user === 0) {
        row.className = "top-user";
      }
    }
  }
}

export function showError(messege, nonValid) {
  let usernames = nonValid ? nonValid : "";
  return (errorDiv.textContent = `${messege} ${usernames}`);
}
