export async function fetchUserData(username) {
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
