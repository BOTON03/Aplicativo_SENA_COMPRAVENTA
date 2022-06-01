
import mongoose from 'mongoose'

const VentaSchema = mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true, },
    
    cliente:{ type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true, },
    
    tipoComprobante:{
        type:String,
        required:[true, "El tipo de comprobante es obligatorio"], 
        maxlength:30,

    }, 

    numComprobante:{
        type:Number,
        required:[true, "El numero de comprobante es obligatorio"],
        maxlength:30,

    },
    serieComprobante:{
        type:Number,
        required:[true, "El numero de comprobante es obligatorio"], 
 
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
    fecha:{
        type:Date,
        default:Date.now,
      
       
 
    },
    detalles:[{
        id:{
            type:String,
            required:true
        },
        nombre:{
            type:String,
            required:[true, "El nombre es requerido"],
            maxlength:50,
        },
        cantidad:{
            type:Number,
            required:[true, "la cantidad es requerido"],
             


        },
        precio:{
            type:Number

        },
        subtotal:{
            type:Number,
          
        },
        descuento:{
            type:Number,
            
        

        }

    }],
    
    estado: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})


   
   


export default mongoose.model("Venta", VentaSchema)