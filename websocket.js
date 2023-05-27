const { server } = require("./app");
const { WebSocketServer } = require("ws");
const pathMatch = require("path-match")({
    sensitive: false,
    strict: false,
    end: true
});
const { URL } = require("url");
let matchRoute = pathMatch("/ws/subscribers/:aeTitle");
WebSocketServer.prototype.shouldHandle = function (req) {
    let params = matchRoute(req.url);

    if (params) {
        req.params = params;
        return true;
    }

    return false;
};

const ws = new WebSocketServer({ server });

ws.on("connection", function (retWs, req) {
    let { aeTitle } = req.params;
    retWs.aeTitle = aeTitle;
});

/**
 * 
 * @param {string} aeTitle 
 * @returns {import("ws").WebSocket[]}
 */
function findWsArrayByAeTitle(aeTitle) {
    let wsArray = [...ws.clients];
    return wsArray.filter(wsClient => wsClient.aeTitle === aeTitle);
}

module.exports.findWsArrayByAeTitle = findWsArrayByAeTitle;