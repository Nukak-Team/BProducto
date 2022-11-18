const getMongo = require("./mongodb.js")

//******************* Conexiones *******************

async function getConexiones() {
    const nameDb = "FerreteriaNukak"
    const client = await getMongo.getClientnExport(nameDb)
    const collection = await getMongo.getCollectionExport(client, nameDb)
    return { collection, client }
}

// ***************** GET *****************

const productosGet = async ()=>{
    const {collection, client} = await getConexiones()
    const productos = await collection.find({}).toArray()
    //.toArray() función de JS que convierte la información en un arreglo.
    await getMongo.closeClientExport(client)
    return productos
}

const productosGetId = async (id) =>{
    var productoEncontrado = null
    const {collection, client} = await getConexiones()
    await collection.findOne({"_id":id}).then(
        (respuesta) => {productoEncontrado = respuesta}
    )
    await getMongo.closeClientExport(client)
    return productoEncontrado
}

const productosGetExistentes = async ()=>{
    const {collection, client} = await getConexiones()
    const producto = await collection.find({"Stock":{$gt:0}}).toArray()
    // for(let i = 0; i < productos.length; i++){
    //     var producto = productos.filter(
    //         (elemento)=>{
    //             return elemento.Stock > 0
    //         }
    //     )
    // }
    await getMongo.closeClientExport(client)
    return producto
}

// ***************** SET *****************

const productosSet = async (producto)=>{
    const {collection, client} = await getConexiones()
    await collection.insertMany(producto)
    await getMongo.closeClientExport(client)
    return await productosGet()
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

const productosCarrito = async (stock, idProducto)=>{
    const {collection, client} = await getConexiones()
    var productos = await productosGetId(idProducto);
    for(let i = 0; i < productos.length; i++){
        if(idProducto === productos[i]._id){
            console.log("******************************");
            console.log(stock[0].Stock);
            productos[i].Stock -= stock[0].Stock
            var productoUpdate = productos[i].Stock
            i=productos.length     
        }
    }
    await collection.updateOne({"_id":idProducto},{"$set":{"Stock":productoUpdate}})
    await getMongo.closeClientExport(client)
    return "Stock resevado"
}

const UpdateProducto = async (stock, idProducto)=>{
    const {collection, client} = await getConexiones()
    var productos = await productosGetId(idProducto);
    
    if(stock[0].Marca != ""){
        productos.Marca = stock[0].Marca
    }
    if(stock[0].Nombre != ""){
        productos.Nombre = stock[0].Nombre
    }
    if(stock[0].Precio != ""){
        productos.Precio = stock[0].Precio
    }else if(stock[0].Precio === 0){
        productos.Precio = 0
    }
    if(stock[0].Categoria != ""){
        productos.Categoria = stock[0].Categoria
    }
    if(stock[0].Descripcion != ""){
        productos.Descripcion = stock[0].Descripcion
    }
    if(stock[0].Stock != ""){
        productos.Stock = stock[0].Stock
    }else if(stock[0].Stock === 0){
        productos.Stock = 0
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