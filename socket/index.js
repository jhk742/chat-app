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
    })
});

io.listen(3000);