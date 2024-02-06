const express = require("express")
const { registerUser, loginUser, findUser } = require("../Controllers/userController")

const router = express.Router()

//create routes
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/find/:userId", findUser)

module.exports = router