export async function fetchUserData(username) {
  let errorMessege = "";
  let data = null;

  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        errorMessege = `User: "${username}" not found`;
        return { response, errorMessege, username };
      } else {
        errorMessege = `API error: ${response.status} ${response.statusText}, please try again later.`;
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    }
    data = await response.json();
    return { response, data, errorMessege, username };
  } catch (error) {
    alert("Network error. Please check your internet connection.");
    return;
  }
}

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

export function sortUsersDataByScore(data, selectedLanguage) {
  let scoreA = 0;
  let scoreB = 0;
  let sortedData = data.sort((a, b) => {
    if (selectedLanguage === "overall") {
      scoreA = a.ranks.overall.score;
      scoreB = b.ranks.overall.score;
    } else {
      scoreA = a.ranks.languages[selectedLanguage].score;
      scoreB = b.ranks.languages[selectedLanguage].score;
    }
    return scoreB - scoreA;
  });

  return sortedData;
}
