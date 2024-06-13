import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    commercial_name: {
        type: String,
        required: true,
        unique: true,
        toLowerCase: true
    },
    generic_name: {
        type: String,
        required: true,
        unique: true,
        toLowerCase: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Medicines', medicineSchema) 