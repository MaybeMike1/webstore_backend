const router = require('express').Router();
const admin = require('../middleware/admin');
const productService = require('./../Service/productService');


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundProduct = await productService.getOne(id);
    res.status(200).send({data : foundProduct});
});

router.post('/create', (req, res) => {
    try{
        const product = productService.insertOne(req).then(data => {
            res.status(201).send({data : "Product successfully added"});
        });
        
    }catch(error){
        res.status(400).send({data : error});
    }
    
});

router.put("/decrement/:id", async (req, res) => {
    await productService.decrementQuantity(req.params.id)
        .then((result) => {
            res.status(201).send({message : "Product was successfully updated", result});
        })
        .catch((error) => {
            res.status(500).send({message : error.toString()})
        })
});

router.put("/increment/:id", async (req, res) => {
    await productService.incrementQuantity(req.params.id)
        .then((result) => {
            res.status(201).send({message : "Product was successfully updated", result});
        })
        .catch((error) => {
            res.status(500).send({message : error.toString()})
        });
});

router.delete("/:id", [admin], async (req, res) => {
    await productService.deleteProduct(req.params.id)
        .then((result) => {
            res.status(200).send({message : "Product was successfully deleted", result});
        })
        .catch((error) => {
            res.status(500).send({message : error.toString()})
        })
});

router.put("/:id", async (req, res) => {
    await productService.updateById(req.params.id, req.body).then((result) => {
        res.status(201).send({message : "Product was successfully updated", result});
    }).catch((error) => {
        res.status(500).send({message : error.toString()})
    })    
})
router.get("/asd", async (req, res) => {
    const categories = await categoryService.getAll();
   res.send("OK");
})

router.get("/brand", async (req, res) => {
    const brands = await productService.getBrand();
    res.status(200).send({data : brands});
});

router.get("/", async (req, res) => {
    const products = await  productService.getAll()
    res.send({data : products})
})

module.exports = router;