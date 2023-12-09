import mongoose, { Schema } from "mongoose"

const ContactSachema = new Schema({
    name: String,
    email:{
        type:String,
        required:true,
    },
    message: {
        type: String,
      },




})

export const Contact = mongoose.models.contacts || mongoose.model('contacts', ContactSachema);