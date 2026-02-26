import { sortUsersDataByScore } from "./logic.js";

export async function fetchUserData2(username) {
  let errorMessege = "";
  let data = null;

  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`,
    );

    // console.log("Response status:", response.status);

    if (!response.ok) {
      if (response.status === 404) {
        errorMessege = `User: "${username}" not found`;
        return { response, errorMessege, username };
        throw new Error(`User "${username}" not found`);
      } else {
        errorMessege = `API error: ${response.status} ${response.statusText}, please try again later.`;
        showError(errorMessege, username);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    }
    data = await response.json();

    return { response, data, errorMessege, username };
  } catch (error) {
    //network error / offline
    errorMessege = "Network error. Please check your internet connection.";
    showError(errorMessege);
    throw error;
  }
}

let testingData = [
  {
    id: "6067119dfbf00e000f893e74",
    username: "SallyMcGrath",
    name: "Sally McGrath",
    honor: 1025,
    clan: "CodeYourFuture",
    leaderboardPosition: 35419,
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
  },
  {
    id: "60be3c9f6a5174005417cd4c",
    username: "CodeYourFuture",
    name: "Code Your Future ",
    honor: 843,
    clan: "CodeYourFuture",
    leaderboardPosition: 51793,
    skills: [],
    ranks: {
      overall: {
        rank: -4,
        name: "4 kyu",
        color: "blue",
        score: 974,
      },
      languages: {
        javascript: {
          rank: -4,
          name: "4 kyu",
          color: "blue",
          score: 970,
        },
        sql: {
          rank: -8,
          name: "8 kyu",
          color: "white",
          score: 4,
        },
        go: {
          rank: -8,
          name: "8 kyu",
          color: "white",
          score: 2,
        },
        ruby: {
          rank: -8,
          name: "8 kyu",
          color: "white",
          score: 2,
        },
      },
    },
    codeChallenges: {
      totalAuthored: 0,
      totalCompleted: 192,
    },
  },
  {
    id: "60c89c654875c50025b90139",
    username: "40thieves",
    name: "Alasdair Smith",
    honor: 12,
    clan: null,
    leaderboardPosition: null,
    skills: null,
    ranks: {
      overall: {
        rank: -8,
        name: "8 kyu",
        color: "white",
        score: 10,
      },
      languages: {
        javascript: {
          rank: -8,
          name: "8 kyu",
          color: "white",
          score: 10,
        },
      },
    },
    codeChallenges: {
      totalAuthored: 0,
      totalCompleted: 2,
    },
  },
];

console.log(testingData[0].ranks.overall.score);

// now i want to make a mock data to send it to sort
//

//a.ranks.overall.score;
// a.ranks.languages[selectedLanguage].score;
let testingData2 = [
  {
    username: "SallyMcGrath",
    ranks: {
      overall: {
        score: 1228,
      },
      languages: {
        javascript: {
          score: 1224,
        },
        sql: {
          score: 4,
        },
        typescript: {
          score: 2,
        },
      },
    },
  },
  {
    username: "CodeYourFuture",
    ranks: {
      overall: {
        score: 974,
      },
      languages: {
        javascript: {
          score: 970,
        },
        sql: {
          score: 4,
        },
        go: {
          score: 2,
        },
        ruby: {
          score: 2,
        },
      },
    },
  },
  {
    username: "40thieves",
    ranks: {
      overall: {
        score: 10,
      },
      languages: {
        javascript: {
          score: 10,
        },
      },
    },
  },
];
let selectedLanguage = "overall";
console.log(sortUsersDataByScore(testingData2, selectedLanguage));

// export function sortUsersDataByScore(data) {
//   let scoreA = 0;
//   let scoreB = 0;
//   let sortedData = data.sort((a, b) => {
//     if (selectedLanguage === "overall" || selectedLanguage === null) {
//       scoreA = a.ranks.overall.score;
//       scoreB = b.ranks.overall.score;
//     } else {
//       scoreA = a.ranks.languages[selectedLanguage].score;
//       scoreB = b.ranks.languages[selectedLanguage].score;
//     }
//     return scoreB - scoreA;
//   });

//   return sortedData;
// }
