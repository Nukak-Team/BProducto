let productos = require("./productos.json")

const productosGet = ()=>{
    return productos
}

const productosSet = (producto)=>{
    productos.push(producto)
    return productos
}

const productosDelete = (id)=>{
    console.log(productos)
    productos = productos.filter((prod)=>{
        return prod.id!=id
    }
    )
    console.log(productos)
    return productos
}

const productosGetId = (id) =>{
    let producto = productos.find(
        (elemento)=>{
            return elemento._id === id
        }
    )
    return producto
}

const productosCarrito = (stock, idProducto)=>{
    for(let i = 0; i < productos.length; i++){
        if(idProducto === productos[i]._id){
            productos[i].Stock -= stock[0].Stock
            i=productos.length      
        }
    }
    return "Producto en Carrito"
}



module.exports.productosGetExport = productosGet;
module.exports.productosSetExport = productosSet;
module.exports.productosDeleteExport = productosDelete;
module.exports.productosGetIdExport = productosGetId;
module.exports.productoCarritoExport = productosCarrito;