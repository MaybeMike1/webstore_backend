const orderService = require("../Service/orderService");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = require("express").Router();

router.get('/', async (req, res) => {
    await orderService.getAll(req, res);
});

router.post('/', [auth] ,async (req, res) => {
    await orderService.createOne(req, res);
})

router.get('/:id', [auth], async (req, res) => {
    await orderService.getAllOrderByUser(req, res);
});


router.get(':/user', [auth], async (req, res) => {

})

module.exports = router;
