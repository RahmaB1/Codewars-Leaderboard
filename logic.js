import { showError } from "./script.js";

const userSallyData = {
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

export async function fetchUserData(username) {
  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`,
    );

    console.log("Response: ", response);
    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
      // throw new Error(`User: ${username} not found`);
      if (response.status === 404) {
        throw new Error(`User "${username}" not found`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.error("Error fetching user data:", error);
    // showError(error.message);
    throw error;
  }
}

// get list of the languages
//then get the ranks for each language

export function getLanguagesNames(usersData) {
  let languagesNamesArray = [];
  for (let user = 0; user < usersData.length; user++) {
    const langsInUser = Object.keys(usersData[user].ranks.languages);
    langsInUser.forEach((lang) => {
      if (!languagesNamesArray.includes(lang)) {
        languagesNamesArray.push(lang);
      }
    });
  }
  return languagesNamesArray;
}
