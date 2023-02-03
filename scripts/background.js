try {
  self.importScripts("./contextMenu.js");

  const DEPLOYMENT_ID =
    "AKfycbxV9VYfTTFHXU10MQM8Cay6hq4i975EDJqWudEK3hZSUwkA-tdkIudqAR3JwN4g0tlg7Q";
  const URL = `https://script.googleapis.com/v1/scripts/${DEPLOYMENT_ID}:run`;

  let authToken;

  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.command) {
      case "token":
        authToken = msg.data;
        response({ message: authToken });
        break;
      case "points":
        sendAPIRequest("addPoints", msg.data);
        response({
          message: `Added ${msg.data[2]} times ${msg.data[1]} points to ${msg.data[0]}`,
        });
        break;
      case "declareWinner":
        console.log("Delcaring winner");
        sendAPIRequest("declareWinner");
        response({ message: "Declaring Winner" });
        break;
      case "retrieveScores":
        retrieveScores().then((scores) => {
          response({ message: scores });
        });
        break;
    }

    return true;
  });

  async function retrieveScores() {
    var scores = await sendAPIRequest("getPointsAndScores");
    return scores;
  }

  async function sendAPIRequest(methodName, data = null) {
    var requestBody = prepareRequestBody(methodName, data);

    var response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      contentType: "application/json",
      body: requestBody,
    });

    if (methodName != "getPointsAndScores") return null;
    if(!response.ok) {
      console.log("Unauthorized. Please contact product owner", response); 
      return;
    }
    return await extractJSON(response.body);
  }

  function prepareRequestBody(methodName, params = null) {
    var payload = new Object();
    payload.function = methodName;
    payload.devMode = true;
    if (params != null) payload.parameters = params;

    return JSON.stringify(payload);
  }

  function createStream(reader) {
    return new ReadableStream({
      start(controller) {
        return pump();
        function pump() {
          return reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            return pump();
          });
        }
      },
    });
  }

  async function extractJSON(body) {
    var stream = await createStream(body.getReader());
    var streamResponseText = await new Response(stream).text();

    // Split the streamResponseText into the json component retrieved from the sheets function
    var jsonSplit = streamResponseText.split("{")[3].split("}")[0];
    jsonSplit = jsonSplit.trim();
    jsonSplit = "{" + jsonSplit;

    // Remove "\" and "\n"
    jsonSplit = jsonSplit.replace(/\\n/g, "");
    jsonSplit = jsonSplit.replace(/\\/g, "");

    // Remove trailing comma
    jsonSplit = jsonSplit.substring(0, jsonSplit.length - 1);
    jsonSplit = jsonSplit + "}";

    var json = await JSON.parse(jsonSplit);
    return json;
  }
} catch (error) {
  console.log(error);
}
