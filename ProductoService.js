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
    let productos = productos.find(
        (elemento)=>{
            return elemento.id=== id
        }
    )
    return productos
}

const productosCarrito = (nombre, idproducto)=>{
    for(let i = 0; i < productos.length; i++){
        if(idproducto === productos[i].id){
            for (let iproducto = 0; iproducto<productos[i].nombre.length; iproducto++){
                for (let j = 0; j < nombre.length; j++){
                    if(productos[i].nombre[iproducto].categoria === nombre[j].catergoria){
                        productos[i].nombre[iproducto].nombre -= nombre[j].nombre
                    }
                }
            } 
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