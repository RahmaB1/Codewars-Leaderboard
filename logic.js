export function fetchUserData(username) {
  const response = fetch(`https://www.codewars.com/api/v1/users/${username}`);
  const data = response.json();
  return data;
}

fetchUserData("SallyMcGrath");
