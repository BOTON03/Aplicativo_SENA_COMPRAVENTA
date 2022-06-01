import Venta from "../models/venta.js"

const helperVenta ={
    existeVentaById: async (id) =>{
        const existe = await Venta.findById(id)
        
        if(!existe){
            throw new Error(`El id no existe ${id}`)
        }
    },
    existeVentaByUsuario: async (usuario) =>{
        const existe = await Venta.findOne({usuario})

        if(existe){
            throw new Error(`ya existe venta con el usuario: ${usuario}`)
        }
    }

}

export default helperVenta