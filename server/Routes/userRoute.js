const express = require("express")
const { registerUser, loginUser } = require("../Controllers/userController")

const router = express.Router()

//create routes
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router