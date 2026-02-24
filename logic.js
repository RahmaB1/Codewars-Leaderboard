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
  const name = userData.name;
  console.log(name);
}

// const userData = fetchUserData("SallyMcGrath");
// const userDataName = displayUserData(userData);
// console.log(displayUserData(userData));

loadUserData("SallyMcGrath");
