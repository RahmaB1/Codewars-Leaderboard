import { showError } from "./script.js";

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

// fetchUserData("CodeYourFuture");
// const response = await fetchUserData("CodeYourFutur");

// const userObject = {
//   data: response.data,
//   errorMessege: response.errorMessege,
// };

// console.log(userObject.errorMessege);
