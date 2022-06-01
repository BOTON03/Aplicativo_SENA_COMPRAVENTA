
import Ingreso from "../models/ingreso.js"

  const ingresoPost=  async (req, res) => {
    const { usuario, proveedor, tipoComprobante, serieComprobante, impuesto, total  } = req.body
    const ingreso = new Ingreso({  usuario, proveedor, tipoComprobante, serieComprobante, impuesto, total  })
    await ingreso.save()
    res.json(ingreso)
  }



  const ingresoGet = async (req, res = response) => {
    const ingreso = await Ingreso.find()
    .populate('usuario', 'nombre')
    .populate('proveedor', 'nombre')
      .sort({ 'createdAt': -1 })
  res.json({
        ingreso
      })
  }



  const ingresoGetQuery = async (req, res = response) => {
    const query = req.query.query;
    const ingreso = await Ingreso.find({
      $or: [
        { usuario: new RegExp(query, 'i') },
        { proveedor: new RegExp(query, 'i') },
        { tipoComprobante: new RegExp(query, 'i') },
        { serieComprobante: new RegExp(query, 'i') },
        { impuesto: new RegExp(query, 'i') },
        { total: new RegExp(query, 'i') },

      ]
    })
    .sort({ 'createdAt': -1 })  
    res.json({
      ingreso
    })
  }

  const ingresoGetById=  async (req, res) => {
    const { id } = req.params.id
    const ingreso = await Ingreso.findOne({ _id: id })
    res.json({
      ingreso
    })
  }


  const ingresoPut= async (req, res )=>{
    const{id} = req.params;
    const {_id, createdAt, estado,... resto} = req.body;
    const ingreso = await Ingreso.findByIdAndUpdate(id, resto);
    res.json({
      ingreso
    })
  }


  const ingresoPutActivar = async (req, res) => {
    const { id } = req.params;
    const ingreso = await Ingreso.findByIdAndUpdate(id, { estado: 1 });

    res.json({
      ingreso
    })
  }
  const ingresoPutDesActivar= async (req, res) => {
    const { id } = req.params;
    const ingreso = await Ingreso.findByIdAndUpdate(id, { estado: 0 });

    res.json({
      ingreso
    })
  }

   const ingresoDelete =async(req, res)=>{
    const {id}= req.params;
    const ingreso = await Ingreso.findByIdAndDelete(id);
    res.json({
      ingreso
    })
  }



export  {ingresoPost, ingresoGet, ingresoGetById, ingresoGetQuery, ingresoPut, ingresoPutActivar, ingresoPutDesActivar, ingresoDelete}