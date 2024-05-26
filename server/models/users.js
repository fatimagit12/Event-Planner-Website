const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "visitor"
    },
    age: Number, // Additional profile field: age
    bio: String // Additional profile field: bio
});

const UserModel = mongoose.model("users2", UserSchema);

module.exports = UserModel;
