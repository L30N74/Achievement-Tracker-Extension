const DEPLOYMENT_ID = "AKfycbxuBd0jwL04KsJR5o-5FqeDsdQTZxokJwNVGmfEDvB0VockZHVUR47PjGNT1xOS8J4fjw"
const URL = `https://script.googleapis.com/v1/scripts/${DEPLOYMENT_ID}:run`

let authToken = "";
window.onload = function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
        authToken = token
    })
}

var times_field = document.getElementById("textbox")
var times = 1
times_field.addEventListener('input', (event) => { 
    times = times_field.value != '' ? times_field.value : 1; 
});

var one_point_button_leon = document.getElementById("one_point_leon")
one_point_button_leon.addEventListener('click', (event) => {
    var response = sendPointsRequest("Leon", 1, times)
})

var three_point_button_leon = document.getElementById("three_point_leon")
three_point_button_leon.addEventListener('click', (event) => {
    var response = sendPointsRequest("Leon", 3, times)
})

var game_completed_leon_button = document.getElementById("completed_game_leon")
game_completed_leon_button.addEventListener('click', (event) => {
    var response = sendPointsRequest("Leon", 5, times)
})

var one_point_button_jasmin = document.getElementById("one_point_jasmin")
one_point_button_jasmin.addEventListener('click', (event) => {
    var response = sendPointsRequest("Jasmin", 1, times)
})

var three_point_button_jasmin = document.getElementById("three_point_jasmin")
three_point_button_jasmin.addEventListener('click', (event) => {
    var response = sendPointsRequest("Jasmin", 3, times)
})

var game_completed_jasmin_button = document.getElementById("completed_game_jasmin")
game_completed_jasmin_button.addEventListener('click', (event) => {
    var response = sendPointsRequest("Jasmin", 5, times)
})

var declare_winner_button = document.getElementById("declare_winner")
declare_winner_button.addEventListener('click', (event) => {
    var response = sendRequest("declareWinner")
})

async function sendRequest(methodName) {
    var requestBody = prepareRequestBody(methodName)

    var response = await window.fetch(URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'contentType': 'application/json',
        body: requestBody
    })
    times_field.value = ""
}

async function sendPointsRequest(player, points, howOften) {
    var requestBody = preparePointsRequestBody(player, points, howOften)

    var response = await window.fetch(URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        'contentType': 'application/json',
        body: requestBody
    })
    times_field.value = ""
}

function prepareRequestBody(methodName) {
    var payload = new Object();
    payload.function = methodName;
    payload.devMode = true;

    return JSON.stringify(payload)
}

function preparePointsRequestBody(player, points, howOften) {
    var payload = new Object();
    payload.function = "addPoints";
    payload.devMode = true;
    payload.parameters = [
        player, // to which player
        points, // how many points to add
        howOften
    ];

    return JSON.stringify(payload)
}
