module.exports={

    getInventory: (req, res) => {
        const db = req.app.get('db')
        db.get_inventory().then(products => {
            res.status(200).send(products)
        })        
        .catch(err => console.log(err))
    },



    getSpecificProduct: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.get_specific_product({id}).then(product => {
            res.status(200).send(product)
        })
    },


    addNewProduct: (req, res) =>{
        const {name, price, img} = req.body
        const db = req.app.get('db')

        // res.status(200).send(req.body)

        db.create_product(name, price, img)        
        .then(products => {            
            res.status(200).send(products)
        })
        .catch(err => console.log(err))
    
    },
    deleteProduct: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.delete_product({id}).then(products => {
            res.sendStatus(200)
        })
        .catch(err => res.status(500).send(err))
    },

    updateProduct: (req, res) => {
        const {id} = req.params
        const {name, price, img} = req.body
        const db = req.app.get('db')
        

        db.update_product({name, price, img, id}).then(product => {
            res.status(200).send(product)
        })
        
    }




}