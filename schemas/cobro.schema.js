const joi = require('joi');
const negocioId = joi.number().integer();
const ventaId = joi.number().integer();
const clienteId = joi.number().integer();
const cobroId = joi.number().integer();
const cuentaId = joi.number().integer();
const monto =  joi.number().positive();
const createcobroSchema = joi.object({
  negocioId: negocioId.required(),
  ventaId: ventaId.required(),
  clienteId: clienteId.required(),
  cuentaId: cuentaId.required(),
  monto: monto.required()
});
const updatecobroSchema = joi.object({
  monto,
});
const getcobroSchema = joi.object({
  negocioId: negocioId.required(),
  cobroId: cobroId.required()
});

module.exports = {
  createcobroSchema,
  updatecobroSchema,
  getcobroSchema
  };
