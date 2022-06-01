
import mongoose from 'mongoose'

const ProveedorSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: [true, "el usuario es obligatorio"],
        maxlength:80, 
       

    },
    
    tipoPersona:{
        type:String,
        required: [true, " el cliente es obligatorio"],
        maxlength:50,
    },

    tipoDocumento:{
        type:String,
        required:[true, "El tipo de comprobante es obligatorio"],
        maxlength:30,

    },

    numDocumento:{
        type:String,
        required:[true, "El numero de comprobante es obligatorio"],
        maxlength:30,

    },
    direccion:{
        type:String,
        required:[true, "El numero de comprobante es obligatorio"],
        maxlength:30,

    },
    telefono:{
        type:Number,
        required:[true, "El impuesto es obligatorio"],
        maxlength:15,
    },
    email:{
        type:String,
        required:[true, "el total es necesario"],
        maxlength:20,

    },
    
    estado: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})


   
   


export default mongoose.model("Proveedor", ProveedorSchema)