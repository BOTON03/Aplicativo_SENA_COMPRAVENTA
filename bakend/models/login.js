import mongoose from 'mongoose'

const LoginSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        maxlength:50,
        unique:true
    },
    password:{
        type:String,
        maxlength:120,
        required:true
    },
    rol:{
        type:String,
        required:true,
        maxlengt:20
    },
    estado:{
        type:Number,
        default:1
    },
    createAt:{
        type:Date,
        default: Date.now
    }
})

export default mongoose.model('Login', LoginSchema)