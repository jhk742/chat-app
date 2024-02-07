const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")

const app = express()
//configure dotenv
require("dotenv").config()

//middleware
app.use(express.json())
app.use(cors())
app.use("/api/users", userRoute)
app.use("/api/chats", chatRoute)

/**
 * CRUD ops
 * app.post -> create
 * app.get -> read
 * app.put -> update
 * app.delete -> delete
 */
app.get("/", (req, res) => {
    res.send("Welcome to our chat app api")
})

const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URI

app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`)
})

mongoose.set('strictQuery', false)

//connect to our db
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection established."))
  .catch((err) => console.log("MongoDB connection failed: ", err)) 