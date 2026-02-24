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

export async function loadUserData(userName) {
  const userData = await fetchUserData(userName);
  return userData;
}

// const userDataName = displayUserData(userData);
// console.log(displayUserData(userData));

const userData = await loadUserData("SallyMcGrath");
console.log(userData.ranks.languages);

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

function getLanguages(userData) {
  const languages = [];
  if (userData) {
    for (let data in userData) {
      languages.push(data);
      console.log(data);
      //was last working here
    }
  }
  //   const languageNames = Object.keys(languages);
  //   console.log(languageNames);
  return languages;
}

// getLanguages(test);
// if i want to work on object length==>> Object.keys(object).length
