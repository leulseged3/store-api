import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    fullName: {
        firstName:{
            type: String, required: true
        },
        lastName: {
            type: String, required: true
        }
    },
    email: { type: String, required: true },
    password: {type: String, required: true},
    userType: { 
        type: String,
        enum: ['USER','STORE_KEEPER','ADMIN'],
        required : true
    }
})