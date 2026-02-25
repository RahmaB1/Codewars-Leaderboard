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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("data is:  ", data.name);
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// const userData = await fetchUserData("SallyMcGrath");
// console.log(userData.name);

// get list of the languages
//then get the ranks for each language
// const languages = getLanguages(userData.ranks.languages);
// console.log(getLanguages(userData.ranks));
// console.log(languages);
// console.log(
//   "this user: ",
//   userData.username,
//   "has these languages: ",
//   languages,
// );

export function getLanguagesNames(userData) {
  //the return is an array of the languages keys / names
  //[ 'javascript', 'sql', 'typescript' ]
  return Object.keys(userData.ranks.languages);
}
// console.log(getLanguagesNames(userSallyData));

//   if (userData) {
//     for (let lang in userData) {
//       languages.push(data);
//       console.log(data);
//       //was last working here
//     }
//   }
//   //   const languageNames = Object.keys(languages);
//   //   console.log(languageNames);
//   return languages;
// }

// getLanguages(test);
// if i want to work on object length==>> Object.keys(object).length
