
require('dotenv').config()
const controller = require('./controller')
const express = require('express')
const app = express()
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING} = process.env

app.use(express.json())


app.get('/api/inventory', controller.getInventory)
app.get('/api/product/:id', controller.getSpecificProduct)
app.post('/api/product', controller.addNewProduct)
app.delete('/api/inventory/:id', controller.deleteProduct)





massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB connected')
    
})

const port = SERVER_PORT
app.listen(port, ()=> console.log(`server running on ${port}`))