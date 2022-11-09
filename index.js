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

app.get(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req)
        res.send(productoService.productosGetExport())
    }
)

app.post(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        let productos = productoService.productosSetExport(req.body)
        res.send({"mensaje":"Producto Guardado","productos": productos})
    }
)

app.delete (pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        let id = req.query.id
        console.log(id)
        let productos = productoService.productosDeleteExport(req.body)
        res.send({"mensaje":"Producto Guardado","productos": productos})
    }
)

app.put(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        res.send("Finaliza")
    }
)

app.patch(pathName,
    (req, res)=>{
        console.log("Recibimos petición")
        console.log(req.body)
        res.send("Finaliza")
    }
)

app.get(pathName+"/id",
    (req, res)=>{
        console.log("Recibimos petición")
        let id = req.query.id
        console.log(id)
        res.send(productoService.productosGetIdExport(id))
    }
)

app.patch(pathName+"/nombre",
    (req, res)=>{
        console.log("Producto en Carrito")
        console.log(req.body)
        id = req.query.id
        res.send(productoService.productoCarritoExport(req.body,id))
    }
)

app.listen(port,
    ()=>{
        console.log("Subió el app producto en el puerto"+port)
    }
)

