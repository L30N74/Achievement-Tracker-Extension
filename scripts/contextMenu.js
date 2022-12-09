// import { sendPointsRequest, sendRequest } from './tracker.js'

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
        id: "Overview",
        title: "Achievement Tracker",
    })
    chrome.contextMenus.create({
        id: "Leon",
        parentId: "Overview",
        title: "Leon",
    })
    chrome.contextMenus.create({
        id: "Jasmin",
        parentId: "Overview",
        title: "Jasmin",
    })

    chrome.contextMenus.create({
        id: "AddSinglePointLeon",
        parentId: "Leon",
        title: "Add Single Point",
    })

    chrome.contextMenus.create({
        id: "AddThreePointsLeon",
        parentId: "Leon",
        title: "Add Three Points",
    })

    chrome.contextMenus.create({
        id: "AddPlatinumLeon",
        parentId: "Leon",
        title: "Completed a game",
    })

    chrome.contextMenus.create({
        id: "AddSinglePointJasmin",
        parentId: "Jasmin",
        title: "Add Single Point",
    })

    chrome.contextMenus.create({
        id: "AddThreePointsJasmin",
        parentId: "Jasmin",
        title: "Add Three Points",
    })

    chrome.contextMenus.create({
        id: "AddPlatinumJasmin",
        parentId: "Jasmin",
        title: "Completed a game",
    })

    chrome.contextMenus.create({
        id: "DetermineWinner",
        parentId: "Overview",
        title: "Determine Winner",
    })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch(info.menuItemId) {
        case "AddSinglePointLeon":
            sendPointsRequest("Leon", 1, 1)
            break;
        case "AddThreePointsLeon":
            sendPointsRequest("Leon", 3, 1)
            break;
        case "AddPlatinumLeon":
            sendPointsRequest("Leon", 5, 1)
            break;
        case "AddSinglePointJasmin":
            sendPointsRequest("Jasmin", 1, 1)
            break;
        case "AddThreePointsJasmin":
            sendPointsRequest("Jasmin", 3, 1)
            break;
        case "AddPlatinumJasmin":
            sendPointsRequest("Jasmin", 5, 1)
            break;
        case "DetermineWinner":
            sendRequest("declareWinner")
            break;
    }
})
