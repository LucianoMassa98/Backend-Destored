const  Generador = require('../modules/Generador');
const boom = require('@hapi/boom');
class ProductoService{

  constructor(){
    this.productos=[];
    this.generate();
  }
  generate(){
    this.productos = [
      {id:'1', nombre:"prd1", price: 100},
      {id:'2', nombre:"prd2", price: 200},
      {id:'3', nombre:"prd3", price: 300}
    ]
  }
  async create(data){

  const Newproducto ={
        id: Generador.NewCodProd(this.productos),
        ...data
    }
    this.productos.push(Newproducto);
    return Newproducto;
  }
   find(){
    return new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve(this.productos);
    }, 5000);
    });
  }
  async findOne(id){
    const producto =  this.productos.find((items) => items.id === id);
    if(!producto)
        {throw boom.notFound('Product not found');}
    return producto;
  }
  async update(id, change){
    const index = this.productos.findIndex(item => item.id === id );
    if(index === -1){ throw boom.notFound('Product not found');}

    const producto = this.productos[index];
    this.productos[index] = {
      ...producto,
      ...change
    }
    return this.productos[index] ;
  }
  async delete(id){
    const index = this.productos.findIndex(item => item.id === id );
    if(index === -1){ throw new Error("Producto inexistente");}

    this.productos.splice(index,1);
    return {id};


  }
}
module.exports = ProductoService;
