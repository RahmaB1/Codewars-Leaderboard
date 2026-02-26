import { fetchUserData, getLanguagesNames } from "./logic.js";
import { fetchUserData2 } from "./temp.js";

// glob variables
let usersData = [];
let nonValidUsers = [];
let languagesNames = [];
let selectedLanguage = "overall";

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
    //
    output.textContent = "Entered Usernames are: ";
    output.textContent += userNamesArray.join(" - ") + "\n"; //just for teesting
    //
    usersData = [];
    handleFetchUsersData(userNamesArray);
  } else {
    console.log("no username entered!");
  }
});

//-------------- Fetch User Data  ----------------------

async function handleFetchUsersData(userNamesArray) {
  const promises = userNamesArray.map((user) => {
    return fetchUserData2(user);
  });
  const results = await Promise.all(promises);
  // console.log(results);
  // console.log(results[0].data);
  // usersData = await Promise.all(promises);

  //pushin only valid data to usersData array
  //the non vaild ones goes to non valid array
  nonValidUsers = [];

  for (let i = 0; i < results.length; i++) {
    if (results[i].response.status === 200) {
      usersData.push(results[i].data);
    } else if (results[i].response.status === 404) {
      nonValidUsers.push(results[i].username);
    }
  }
  if (nonValidUsers.length > 0) {
    let messege = "these usernames were not found: ";
    let names = nonValidUsers.join(", ");
    showError(messege, names);
  }
  // console.log("test the non valid user repeation:  ", nonValidUsers);

  // now we should have two arrays
  // console.log("usersData: ", usersData);
  // console.log("nonValidUsers: ", nonValidUsers);
  //---------------------------------------------
  // const userObject = {
  //   data: usersData.data,
  //   errorMessege: usersData.errorMessege,
  // };

  // console.log(userObject.errorMessege);

  //----------------------------------------------------------

  // const validUsers = [];
  // const invalidUsers = [];

  // results.forEach((result) => {
  //   if (result.status === "fulfilled") {
  //     validUsers.push(result.value);
  //   } else {
  //     invalidUsers.push(result.reason.message);
  //   }
  // });

  // if (invalidUsers.length > 0) {
  //   showError(`These users were not found: ${invalidUsers.join(", ")}`);
  // }

  // if (validUsers.length === 0) {
  //   return; // nothing to render
  // }

  // usersData = validUsers;

  //---------------------------------------------------------------
  // console.log("usersData: ", usersData);

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
  // console.log("line 58");
  // console.log(languagesNames);
}

select.addEventListener("change", () => {
  selectedLanguage = select.value;
  // console.log("Selected language:", selectedLanguage);
  renderRanks(usersData, selectedLanguage);
});

function renderRanks() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  usersData = sortUsersDataByScore();
  //render for multiple users and any lang
  const languageNamesforuser = getLanguagesNames(usersData);
  // console.log("languageNamesforuser: ", languageNamesforuser);

  // console.log("line");
  //will need to sort the usersData

  for (let user = 0; user < usersData.length; user++) {
    if (selectedLanguage === "overall") {
      // console.log("Overall is selected");
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
      // console.log(
      //   "Language is valid: check the score ... ",
      //   usersData[user].ranks.languages[selectedLanguage].score,
      // );

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
      // console.log("Language is not valid:", selectedLanguage);
    }
  }

  //this renders for one user - any language
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

export function sortUsersDataByScore() {
  let scoreA = 0;
  let scoreB = 0;
  let sortedData = usersData.sort((a, b) => {
    if (selectedLanguage === "overall") {
      scoreA = a.ranks.overall.score;
      scoreB = b.ranks.overall.score;
    } else {
      scoreA = a.ranks.languages[selectedLanguage].score;
      scoreB = b.ranks.languages[selectedLanguage].score;
    }
    return scoreB - scoreA;
  });
  // return usersData.sort((a, b) => {
  //   // const scoreA =
  //   //   selectedLanguage === "overall"
  //   //     ? a.ranks.overall.score
  //   //     : a.ranks.languages[selectedLanguage].score;
  //   // const scoreB =
  //   //   selectedLanguage === "overall"
  //   //     ? b.ranks.overall.score
  //   //     : b.ranks.languages[selectedLanguage].score;
  //   const scoreA = a.ranks.overall.score;
  //   const scoreB = b.ranks.overall.score;
  //   return scoreB - scoreA; // Sort in descending order
  // });
  return sortedData;
}

export function showError(messege, nonValid) {
  let usernames = nonValid ? nonValid : "";
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = ` ${messege} ${usernames}`;
}
