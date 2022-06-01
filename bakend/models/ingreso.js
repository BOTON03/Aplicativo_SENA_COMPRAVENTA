
import mongoose from 'mongoose'

const IngresoSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true,
    },
    proveedor:
        { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true, },

    tipoComprobante:{
        type:String,
        required:[true, "El tipo de comprobante es obligatorio"],
        maxlength:30,

    },

    numComprobante:{
        type:String,
        required:[true, "El numero de comprobante es obligatorio"],
        maxlength:30,

    },
    serieComprobante:{
        type:String,
        required:[true, "El numero de comprobante es obligatorio"],
        maxlength:30,

    },
    impuesto:{
        type:Number,
        required:[true, "El impuesto es obligatorio"],
        maxlength:30,
    },
    total:{
        type:Number,
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


   
   


export default mongoose.model("Ingreso", IngresoSchema)