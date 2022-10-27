const router = require('express').Router();
const Mongoose  = require('mongoose');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { validate } = require('../Models/users');
const {registerUser, signIn, getAll, deleteById} = require('./../Service/userService');



router.get('/', async (req, res) => {
    const users = getAll()
        .then((result) => {
            res.status(200).send({data : result})
        })
        .catch((error) => {
            res.status(500).send({message : error.toString()})
        })
})
router.post('/login', async (req, res) => {
    return await signIn(req, res);
})

router.post('/register', async (req, res) => {
    return await registerUser(req, res);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    await deleteById(req.params.id)
        .then((result) => {
            res.status(201).send({data : result});
        })
        .catch((error) => {
            res.status(500).send({message : error.toString()})
        })
});



module.exports = router;

