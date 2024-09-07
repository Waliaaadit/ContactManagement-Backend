const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    name:{
        type: String,
        required: [true, "Please Add the Contact name"],

    },
    email:{
        type: String,
        required: [true, "Please Add the Email address"],

    },
    phone:{
        type: String,
        required: [true, "Please Add the Phone number"],

    },
}, 
{
    timestamps: true,
}
);

module.exports = mongoose.model("Contact", contactSchema);