import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    imageUrl: { type: String },

});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
