import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = getPortArgument();

function getPortArgument() {
    const args = process.argv;
    const pIndex = args.indexOf("-p");
    const longIndex = args.indexOf("--port");

    let port = 3000;

    if (pIndex !== -1 && args[pIndex + 1]) {
        port = parseInt(args[pIndex + 1], 10);
    } else if (longIndex !== -1 && args[longIndex + 1]) {
        port = parseInt(args[longIndex + 1], 10);
    }

    return port;
}

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        socket.on("chat-message", (message) => {
            console.log("Received message:", message);
            io.emit("chat-message", message);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});