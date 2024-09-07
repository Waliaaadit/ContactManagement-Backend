const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please enter your First Name "]
    },
    email:{
        type: String,
        required: [true, "Please enter your Email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please enter your Password"],
    },
   },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);

