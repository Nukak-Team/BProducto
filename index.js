const express = require ("express")
const cors = require ("cors")
const path = require ("path")
const body_parser = require ("body-parser")
const productoService = require("./ProductoService.js")

const app = express()
const port = 8085

app.use(cors())
app.use(body_parser.json())

const pathName = "/productos"

// ***************** GET *****************

app.get(pathName,
    async (req, res)=>{
        console.log("Recibimos petición")
        let id = req.query.id
        res.send(await productoService.productosGetExport(id))
    }
)

app.get(pathName+"/id",
    async (req, res)=>{
        console.log("Recibimos petición")
        let id = req.query.id
        console.log(id)
        res.send(await productoService.productosGetIdExport(id))
    }
)

app.get(pathName+"/existencias",
    async (req, res)=>{
        console.log("Recibimos petición")
        //console.log(req)
        res.send(await productoService.productosGetExistentesExport())
    }
)

// ***************** POST *****************

app.post(pathName,
    async (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        let productos = await productoService.productosSetExport(req.body)
        res.send({"mensaje":"Producto Guardado","productos": productos})
    }
)

// ***************** DELETE *****************

app.delete (pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        let id = req.query.id
        console.log(id)
        let productos = productoService.productosDeleteExport(req.body)
        res.send({"mensaje":"Producto Guardado","productos": productos})
    }
)

// ***************** PUT *****************

app.put(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        res.send("Finaliza")
    }
)

// ***************** PATCH *****************

app.patch(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        res.send("Finaliza")
    }
)

app.patch(pathName+"/nombre",
    async (req, res)=>{
        try{
            console.log("Producto en Carrito")
            id = req.query.id
            console.log(req.body);
            res.send (await productoService.productoCarritoExport(req.body,id))
        }
        catch{
            res.status(500)
            res.send("Error al actualizar el producto")
        }
    }   
)

app.patch(pathName+"/update",
   async (req, res)=>{
        try{
            console.log("Update producto por administrador")
            id = req.query.id
            console.log(req.body);
            res.send(productoService.UpdateProductoExport(req.body,id))
        }
        catch{
            res.status(500)
            res.send("Error al actualizar el producto")
        }
    }   
)

// ***************** LISTEN *****************

app.listen(port,
    ()=>{
        console.log("Subió el app producto en el puerto "+port)
    }
)

