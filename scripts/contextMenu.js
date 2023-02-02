chrome.contextMenus.removeAll(function () {
  chrome.contextMenus.create({
    id: "Overview",
    title: "Achievement Tracker",
  });
  chrome.contextMenus.create({
    id: "Leon",
    parentId: "Overview",
    title: "Leon",
  });
  chrome.contextMenus.create({
    id: "Jasmin",
    parentId: "Overview",
    title: "Jasmin",
  });

  chrome.contextMenus.create({
    id: "AddSinglePointLeon",
    parentId: "Leon",
    title: "Add Single Point",
  });

  chrome.contextMenus.create({
    id: "AddThreePointsLeon",
    parentId: "Leon",
    title: "Add Three Points",
  });

  chrome.contextMenus.create({
    id: "AddPlatinumLeon",
    parentId: "Leon",
    title: "Completed a game",
  });

  chrome.contextMenus.create({
    id: "AddSinglePointJasmin",
    parentId: "Jasmin",
    title: "Add Single Point",
  });

  chrome.contextMenus.create({
    id: "AddThreePointsJasmin",
    parentId: "Jasmin",
    title: "Add Three Points",
  });

  chrome.contextMenus.create({
    id: "AddPlatinumJasmin",
    parentId: "Jasmin",
    title: "Completed a game",
  });

  chrome.contextMenus.create({
    id: "DetermineWinner",
    parentId: "Overview",
    title: "Determine Winner",
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "AddSinglePointLeon":
      console.log("Adding single point to Leon");
      chrome.runtime.sendMessage(
        { command: "points", data: ["Leon", 1, 1] },
        (response) => {
          console.log(response);
        }
      );
      break;
    case "AddThreePointsLeon":
      chrome.runtime.sendMessage(
        { command: "points", data: ["Leon", 3, 1] },
        (response) => {
          console.log(response);
        }
      );
      break;
    case "AddPlatinumLeon":
      chrome.runtime.sendMessage(
        { command: "points", data: ["Leon", 5, 1] },
        (response) => {
          console.log(response);
        }
      );
      break;
    case "AddSinglePointJasmin":
      chrome.runtime.sendMessage(
        { command: "points", data: ["Jasmin", 1, 1] },
        (response) => {
          console.log(response);
        }
      );
      break;
    case "AddThreePointsJasmin":
      chrome.runtime.sendMessage(
        { command: "points", data: ["Jasmin", 3, 1] },
        (response) => {
          console.log(response);
        }
      );
      break;
    case "AddPlatinumJasmin":
      chrome.runtime.sendMessage(
        { command: "points", data: ["Jasmin", 5, 1] },
        (response) => {
          console.log(response);
        }
      );
      break;
    case "DetermineWinner":
      chrome.runtime.sendMessage(
        { command: "declareWinner", data: {} },
        (response) => {
          console.log(response);
        }
      );
      break;
  }
});
