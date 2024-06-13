import mongoose from "mongoose";

const BulletinsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: 'https://dummyimage.com/300x200/E6E6FA/ccc.png&text=image'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

export default mongoose.model('Bulletins', BulletinsSchema)