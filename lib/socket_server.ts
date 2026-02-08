export function getSocketIO() {
    if (!global.io) {
        throw new Error("Socket.IO not initialized");
    }
    return global.io;
}

export function broadcast(eventName: string, data: any) {
    if (global.io) {
        global.io.emit(eventName, data);
    }
}