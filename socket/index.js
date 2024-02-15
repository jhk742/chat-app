const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = []

io.on("connection", (socket) => {
    console.log("New connection", socket.id)

    //listen to a connection (addNewUser event) -> need to fire this event from the client-side (ChatContext)
    socket.on("addNewUser", (userId) => {
        //check to see who's online. Only if the user is not online should we push to the onlineUsers array
        //If .some returns false (meaning the user is not online), negate it (false -> true), which will 
        //instigate the .push
        !onlineUsers.some((user) => {
            user.userId === userId
        }) &&
        //whenever the client triggers the addNewUser event, we add the userId with the current socketId
        onlineUsers.push({
            userId,
            socketId: socket.id
        })
        console.log("ONLINE USERS: ", onlineUsers)

        //broadcast who is online
        io.emit("getOnlineUsers", onlineUsers)
    })

    //add message
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId)

        if (user) {
            io.to(user.socketId).emit("getMessage", message)
        }

    })

    //listen to the disconnect event
    socket.on("disconnect", () => {
        //update the onlineUsers array
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
        
        io.emit("getOnlineUsers", onlineUsers)
    })

    /**
     * recap of what's happening above:
       whenever we log in, the socket server creates a new connection
       we listen to an event (on), addNewUser, that's emitted from the client (inside a useEffect)
       we add it to the onlineUsers array. From here, we send (emit) and event, getOnlineUsers,
       to any client that's up and running to inform them of the others who are currently online.
       bi-directional comms
     */
});

io.listen(3000);