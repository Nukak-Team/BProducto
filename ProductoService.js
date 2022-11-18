const getMongo = require("./mongodb.js")

//******************* Conexiones *******************

async function getConexiones() {
    const nameDb = "FerreteriaNukak"
    const client = await getMongo.getClientExport(nameDb)
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
    const producto = await collection.find({Stock: {$gt: 0}}).toArray()
    console.log(producto);
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
    var productos = await productosGetId(idProducto);
    const {collection, client} = await getConexiones()
    console.log("********************");
    console.log(stock[0].Stock);
    productos.Stock -= stock[0].Stock
    let productoUpdate = productos.Stock
    await collection.updateOne({"_id":idProducto},{"$set":{"Stock":productoUpdate}})
    await getMongo.closeClientExport(client)
    return "Stock resevado"
}

const UpdateProducto = async (stock, idProducto)=>{
    const {collection, client} = await getConexiones()

    if(stock[0].Marca != ""){
        productoUpdate = await stock[0].Marca
        await collection.updateOne({"_id":idProducto},{"$set":{"Marca":productoUpdate}})
    }
    if(stock[0].Nombre != ""){
        productoUpdate = stock[0].Nombre
        await collection.updateOne({"_id":idProducto},{"$set":{"Nombre":productoUpdate}})
    }
    if(stock[0].Precio != ""){
        productoUpdate = stock[0].Precio
        await collection.updateOne({"_id":idProducto},{"$set":{"Precio":productoUpdate}})
    }else if(stock[0].Precio === 0){
        productoUpdate = 0
        await collection.updateOne({"_id":idProducto},{"$set":{"Precio":productoUpdate}})
    }
    if(stock[0].Categoria != ""){
        productoUpdate = stock[0].Categoria
        await collection.updateOne({"_id":idProducto},{"$set":{"Categoria":productoUpdate}})
    }
    if(stock[0].Descripcion != ""){
        productoUpdate = stock[0].Descripcion
        await collection.updateOne({"_id":idProducto},{"$set":{"Descripcion":productoUpdate}})
    }
    if(stock[0].Stock != ""){
        productoUpdate = stock[0].Stock
        await collection.updateOne({"_id":idProducto},{"$set":{"Stock":productoUpdate}})
    }else if(stock[0].Stock === 0){
        productoUpdate = 0
        await collection.updateOne({"_id":idProducto},{"$set":{"Stock":productoUpdate}})
    }
    await getMongo.closeClientExport(client)
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