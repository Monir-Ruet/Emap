import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000; // or your getPortArgument()
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
app.prepare().then(() => {
    const httpServer = createServer(handler);
    // ✅ Create Socket.IO server and initialize singleton
    const io = new Server(httpServer, {
        cors: { origin: "*", methods: ["GET", "POST"] },
    });
    global.io = io;
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);
        socket.on("chat-message", (message) => {
            console.log("Received message:", message);
            io.emit("chat-message", message); // broadcast to all
        });
        socket.on("disconnect", () => console.log("user disconnected"));
    });
    httpServer.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
