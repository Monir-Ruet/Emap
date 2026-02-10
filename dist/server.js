import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer, {
        cors: { origin: "*", methods: ["GET", "POST"] },
    });
    global.io = io;
    setInterval(() => {
        io.emit("visitor", { count: io.engine.clientsCount });
    }, 30000);
    io.on("connection", (socket) => {
        socket.emit("visitor", { count: io.engine.clientsCount });
    });
    httpServer.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
