import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userType: {
        type: String,
        enum: ['INVESTOR', 'STORE_KEEPER', 'ADMIN'],
        required: true
    }
}, { timestamps: true });
