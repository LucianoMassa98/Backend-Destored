const express=require('express');
const router=express.Router();
const VentasService = require('../services/ventas.service');
const service = new VentasService();
const  {
  createventaSchema,
  updateventaSchema,
  getventaSchema,
  addItemSchema,
  queryCompraSchema,
  substractItemSchema
  } = require('../schemas/venta.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/:negocioId',
  validatorHandler(queryCompraSchema,'query'),
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const ventas=await service.find(negocioId,req.query);
    res.json(ventas);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:ventaId',
validatorHandler(getventaSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,ventaId}=req.params;
  const venta = await service.findOne(negocioId,ventaId);
  res.json(venta);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createventaSchema,'body'),
async (req, res) => {
  const body = req.body;
  const Newventa = await service.create(body);
  res.json({
    message: 'created',
    data: Newventa
  });
});

router.post('/add-item',
validatorHandler(addItemSchema,'body'),
async (req, res) => {
  const body = req.body;
  const Newcompra = await service.addItem(body);
  res.json({
    message: 'created',
    data: Newcompra
  });
});

router.patch('/:negocioId/:ventaId',
validatorHandler(getventaSchema,'params'),
validatorHandler(updateventaSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,ventaId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,ventaId,body);
    res.json(xupdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:ventaId',
  validatorHandler(getventaSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,ventaId } = req.params;
  const delX = await service.delete(negocioId,ventaId);
  res.json(delX);
  }catch(err){
    next(err);
  }
});

router.delete('/subtract-item/:ventaId/:productoId',
validatorHandler(substractItemSchema,'params'),
async (req, res) => {
  const Newcompra = await service.subtractItems(req.params);
  res.json({
    message: 'created',
    data: Newcompra
  });
});


module.exports=router;
