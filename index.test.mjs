import test from "node:test";
import assert from "node:assert";

import { sortUsersDataByScore, getLanguagesNames } from "./logic.js";
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

test("sorting overall ranks heighest to lowest", () => {
  let selectedLanguage = "overall";
  let sorted = sortUsersDataByScore(testingData, selectedLanguage);
  console.log(sorted);
  assert.deepEqual(sorted[0].username, "SallyMcGrath");
});

test("get all possible languages for muliple usernames using getLanguagesNames()", () => {
  let languages = getLanguagesNames(testingData);
  assert.deepEqual(languages, [
    "javascript",
    "sql",
    "typescript",
    "go",
    "ruby",
  ]);
});
