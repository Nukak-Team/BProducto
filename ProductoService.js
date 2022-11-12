let productos = require("./productos.json")

// ***************** GET *****************

const productosGet = ()=>{
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

const productosGetExistentes = ()=>{
    
    for(let i = 0; i < productos.length; i++){
        var producto = productos.filter(
            (elemento)=>{
                return elemento.Stock > 0
            }
        )
    }
    return producto
}


// ***************** SET *****************

const productosSet = (producto)=>{
    productos.push(producto)
    return productos
}

// ***************** DELETE *****************

const productosDelete = (id)=>{
    console.log(productos)
    productos = productos.filter((prod)=>{
        return prod.id!=id
    })
    console.log(productos)
    return productos
}

// ***************** UPDATE *****************

const productosCarrito = (stock, idProducto)=>{
    for(let i = 0; i < productos.length; i++){
        if(idProducto === productos[i]._id){
            console.log("******************************");
            console.log(stock[0].Stock);
            productos[i].Stock -= stock[0].Stock
            i=productos.length     
        }
    }
    return "Producto en Carrito"
}

const UpdateProducto = (stock, idProducto)=>{
    for(let i = 0; i < productos.length; i++){
        if(idProducto === productos[i]._id){
            console.log("******************************");
            console.log(stock[0].Stock);
            console.log("******************************");
            console.log(stock[0]);
            console.log("******************************");
            console.log(stock[0].Precio);

            if(stock[0].Marca != ""){
                productos[i].Marca = stock[0].Marca
            }
            if(stock[0].Nombre != ""){
                productos[i].Nombre = stock[0].Nombre
            }
            if(stock[0].Precio != ""){
                productos[i].Precio = stock[0].Precio
            }
            if(stock[0].Categoria != ""){
                productos[i].Categoria = stock[0].Categoria
            }
            if(stock[0].Descripcion != ""){
                productos[i].Descripcion = stock[0].Descripcion
            }
            if(stock[0].Stock != ""){
                productos[i].Stock = stock[0].Stock
            }
            i=productos.length     
        }
    }
    return "Producto actualizado(s)"
}

// ***************** EXPORT *****************

module.exports.productosGetExport = productosGet;
module.exports.productosSetExport = productosSet;
module.exports.productosDeleteExport = productosDelete;
module.exports.productosGetIdExport = productosGetId;
module.exports.productoCarritoExport = productosCarrito;
module.exports.UpdateProductoExport = UpdateProducto;
module.exports.productosGetExistentesExport = productosGetExistentes;