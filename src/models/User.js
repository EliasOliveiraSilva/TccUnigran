import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: '1234'
    },
    age: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    cns: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    },
    scheduling: {
        type: Array,
        required: true
    },
    medicines:{
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('User', userSchema)