import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    password : String,
    email : String,
    identifier : String,
    cellphone : Number,
    shopName : String,
    


    
})