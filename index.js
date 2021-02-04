const { on } = require("events");

const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let players = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("room", (data) => {
    players.push({ name: data, id: socket.id });
    io.emit("connectedsRoom", players);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(3001);
