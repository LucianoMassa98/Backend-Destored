const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('../models/negocio.model');
const {VENTA_TABLE}=require('../models/venta.model');
const {CLIENTE_TABLE}=require('../models/cliente.model');
const {CUENTA_TABLE}=require('../models/cuenta.model');
const COBRO_TABLE = 'cobros';
const cobroSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  negocioId:{
    field: 'negocio_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: NEGOCIO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  ventaId:{
    field: 'venta_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: VENTA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  cuentaId:{
    field: 'cuenta_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUENTA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  monto: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Cobro extends Model{
  // crear metodos estaticos
  static associate(models){
    this.belongsTo(models.Negocio, {as: 'negocio'});
   this.belongsTo(models.Cuenta, {as: 'cuenta'});
   this.belongsTo(models.Venta, {as: 'venta'});
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  COBRO_TABLE,
      modelName: 'Cobro',
      timestamps: false
    }
  }
}
module.exports = {
  COBRO_TABLE,
  cobroSchema,
  Cobro
}
