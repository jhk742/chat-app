const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY
    return jwt.sign({_id}, jwtKey, {expiresIn: "3d"})
}

/**
 * Status codes:
 * 200: good
 * 400: user error
 * 500: server error
 */

//run when frontend sends a post request
const registerUser = async (req, res) => {
    try {
        //first, retrieve data from the req.body (json obj)
        const {name, email, password} = req.body

        //check if user already exists in the db
        let user = await userModel.findOne({email})

        //user already exists
        if (user)
            return res.status(400).json("User with the given email already exists.")
    
        //check to make sure all fields are provided
        if (!name || !email || !password) 
            return res.status(400).json("All fields are required.")
    
        //Verify the strength of fields using the validator module
        if (!validator.isEmail(email)) 
            return res.status(400).json("Email must be a valid email.")
        if (!validator.isStrongPassword(password)) 
            return res.status(400).json("Password must be a strong password.")
    
        //all security conditions passed -> create a new instance of the userModel
        user = new userModel({name, email, password})
        
        //hash and assign the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    
        //create and register user into db
        await user.save()
    
        //create a token
        const token = createToken(user._id)
    
        //send response to client/frontend
        res.status(200).json({_id: user._id, name, email, token})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        let user = await userModel.findOne({ email })
        
        //user doesn't exist
        if (!user)
            return res.status(400).json("Invalid email or password.")

        //check if password is valid
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword)
            return res.status(400).json("Invalid email or password.")

        //create a token
        const token = createToken(user._id)
    
        //send response to client/frontend
        res.status(200).json({_id: user._id, name: user.name, email, token})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await userModel.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

//export functions (specifically to userRoute)
module.exports = { registerUser, loginUser, findUser, getUsers }