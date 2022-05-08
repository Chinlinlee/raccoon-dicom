const server = require("./app").server;
let io;

module.exports = {
    ...module.exports,
    init: () => {
        io = require("socket.io")(server);
        return io;
    },
    get: () => {
        if (!io) {
            throw new Error("socket is not initialized");
        }
        return io;
    }
};
