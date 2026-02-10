export function getSocketIO() {
    if (!global.io) {
        throw new Error("Socket.IO not initialized");
    }
    return global.io;
}
export function broadcast(eventName, data) {
    if (global.io) {
        global.io.emit(eventName, data);
    }
}
