import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
});

export default mongoose.model('User', userSchema);
