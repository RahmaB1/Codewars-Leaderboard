export async function fetchUserData(username) {
  let errorMessege = "";

  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`,
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      if (response.status === 404) {
        errorMessege = `User: "${username}" not found`;
        throw new Error(`User "${username}" not found`);
      } else {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // This usually means network error / offline
      throw new Error("Network error. Please check your internet connection.");
    }

    throw error;
  }
}

// fetchUserData("CodeYourFuture");
const response = await fetchUserData("CodeYourFuture");

const userObject = {
  data: response.data,
  errorMessege:
    response.status === 200
      ? ""
      : response.status === 404
        ? "user not found"
        : "unexpected error, try again ",
};

console.log(userObject.errorMessege);
