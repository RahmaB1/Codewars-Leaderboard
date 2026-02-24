const usernameInput = document.getElementById("usernameInput");
const submitButton = document.getElementById("submitButton");
let username = "";
const output = document.getElementById("output");
submitButton.addEventListener("click", function () {
  username = usernameInput.value;
  console.log("Username entered: " + username);
  output.textContent += "Hello, " + username + "!";
});
