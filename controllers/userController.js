const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

// @desc Register New User
// @route POST/api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Ensure all fields are provided
    if (!username || !email || !password) {
        res.status(400);
        return res.json("All fields are mandatory!");
    }
    // Check if user already exists
    
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        return res.json({ message: "User already exists!" });
        // throw new Error ("User already Exists !");
   }

   // Hash Password
   const hashedPassword = await bcrypt.hash(password, 10);
   console.log("Hashed Password", hashedPassword);

    // Create new user
   const user = await User.create({
    username,
    email,
    password: hashedPassword,
   });

   console.log(`User created successfuly $(user)`);

    // Return user info if created successfully
   if(user){
    res.status(201).json({_id: user.id, email: user.email});
   }
   else{
    res.status(400);
    return res.json("Invaild user data");

   }
    // res.json({message: "Register New User"});
});

// @desc Login Existing User
// @route POST/api/users/login
// @access public
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;

    if (!email || !password){
        res.status(400).json("All fields are mandatory !");
    }

    const user = await User.findOne({email});
    //  Compare entered pass with stored hash passowrd
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1h"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401).json({message: "Password does not match !"});
    }
});

// @desc Current 
// @route GET/api/users/current
// @access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});
module.exports = { registerUser, loginUser, currentUser};





