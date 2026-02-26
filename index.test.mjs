// This is a placeholder file which shows how you use the nock library to
// "mock" fetch requests, replacing real requests with fake ones that you
// control in the test. This means you can "force" the fetch request to return
// data in the format that you want.
// IMPORTANT: You _must_ run npm install within the Project-Codewars-Leaderboard
// folder for this to work.
// You can change or delete the contents of the file once you have understood
// how it works.

import test from "node:test";
import assert from "node:assert";
import nock from "nock";
import { sortUsersDataByScore } from "./logic.js";

test("sorting overall ranks heighest to lowest", () => {
  let testingData = [
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
  let sorted = sortUsersDataByScore(testingData, selectedLanguage);
  console.log(sorted);
  assert.deepEqual(sorted[0].username, "SallyMcGrath");
});

// test("mocks a fetch function", async () => {
//   // Create a fetch request "mock" using the nock library, which "replaces"
//   // real requests with fake ones that we can control in the test using nock
//   // functions.
//   // In this example, we set up nock so that it looks for GET requests to
//   // https://example.com/test (no other URLs will work) and responds with a 200
//   // HTTP status code, and the body {"user": "someone"}.
//   const scope = nock("https://example.com")
//     .get("/test")
//     .reply(200, JSON.stringify({ user: "someone" }));

//   // Check that the response we got back included the fake body we set up.
//   const response = await makeFetchRequest();
//   const parsedResponse = await response.json();
//   assert(parsedResponse.user === "someone");

//   // Ensure that a fetch request has been replaced by the nock library. This
//   // helps ensure that you're not making real fetch requests that don't match
//   // the nock configuration.
//   assert(scope.isDone() === true, "No matching fetch request has been made");
// });
