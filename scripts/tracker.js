const SHEET_ID = "";
const SHEETS_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?`;
const SHEET_NAME = "Achievement Score";

let authToken = "1-ArEANPV3Prha7GlUoLAkGQ_i_K-H0uFrQWu2KNKuLA";

var count_field_leon = document.getElementById("count_leon");
var count_field_jasmin = document.getElementById("count_jasmin");
var points_field_leon = document.getElementById("points_leon");
var points_field_jasmin = document.getElementById("points_jasmin");

var times_field = document.getElementById("textbox");
var test_button = document.getElementById("test_button");

var one_point_button_leon = document.getElementById("one_point_leon");
var three_point_button_leon = document.getElementById("three_point_leon");
var game_completed_leon_button = document.getElementById("completion_leon");

var one_point_button_jasmin = document.getElementById("one_point_jasmin");
var three_point_button_jasmin = document.getElementById("three_point_jasmin");
var game_completed_jasmin_button = document.getElementById("completion_jasmin");

var declare_winner_button = document.getElementById("declare_winner");
var log_field = document.getElementById("log");

var times = 1;
times_field.addEventListener("input", (event) => {
  times = times_field.value != "" ? times_field.value : 1;
});

window.onload = function () {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    chrome.runtime.sendMessage({ command: "token", data: token }, (response) =>
      retrieveScoreValues()
    );
  });
};

one_point_button_leon.addEventListener("click", (event) => {
  chrome.runtime.sendMessage(
    { command: "points", data: ["Leon", 1, times] },
    (response) => {
      log.innerHTML = response.message;
      times_field.value = "";

      retrieveScoreValues();
    }
  );
});

three_point_button_leon.addEventListener("click", (event) => {
  chrome.runtime.sendMessage(
    {
      command: "points",
      data: ["Leon", 3, times],
    },
    (response) => {
      log.innerHTML = response.message;
      times_field.value = "";

      retrieveScoreValues();
    }
  );
});

game_completed_leon_button.addEventListener("click", (event) => {
  chrome.runtime.sendMessage(
    {
      command: "points",
      data: ["Leon", 5, times],
    },
    (response) => {
      log.innerHTML = response.message;
      times_field.value = "";

      retrieveScoreValues();
    }
  );
});

one_point_button_jasmin.addEventListener("click", (event) => {
  chrome.runtime.sendMessage(
    {
      command: "points",
      data: ["Jasmin", 1, times],
    },
    (response) => {
      log.innerHTML = response.message;
      times_field.value = "";

      retrieveScoreValues();
    }
  );
});

three_point_button_jasmin.addEventListener("click", (event) => {
  chrome.runtime.sendMessage(
    {
      command: "points",
      data: ["Jasmin", 3, times],
    },
    (response) => {
      log.innerHTML = response.message;
      times_field.value = "";

      retrieveScoreValues();
    }
  );
});

game_completed_jasmin_button.addEventListener("click", (event) => {
  chrome.runtime.sendMessage(
    {
      command: "points",
      data: ["Jasmin", 5, times],
    },
    (response) => {
      log.innerHTML = response.message;
      times_field.value = "";

      retrieveScoreValues();
    }
  );
});

declare_winner_button.addEventListener("click", (event) => {
  chrome.runtime.sendMessage(
    {
      command: "declareWinner",
      data: {},
    },
    (response) => {
      log.innerHTML = response.message;

      retrieveScoreValues();
    }
  );
});

function updateScores(scores) {
  count_field_leon.innerHTML = scores.Count_Leon;
  count_field_jasmin.innerHTML = scores.Count_Jasmin;
  points_field_leon.innerHTML = scores.Points_Leon;
  points_field_jasmin.innerHTML = scores.Points_Jasmin;
}

function retrieveScoreValues() {
  try {
    chrome.runtime.sendMessage(
      {
        command: "retrieveScores",
        data: {},
      },
      (response) => {
        updateScores(response.message);
      }
    );
  } catch (error) {
    console.log(error);
  }
}
