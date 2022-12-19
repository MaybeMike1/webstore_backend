const router = require('express').Router()
const Mongoose = require('mongoose')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const { validate } = require('../Models/users')
const userService = require('./../Service/userService')
const {
  registerUser,
  signIn,
  getAll,
  deleteById,
} = require('./../Service/userService')

router.get('/', async (req, res) => {
  const users = getAll()
    .then((result) => {
      res.status(200).send({ data: result })
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() })
    })
})

router.get('/:id', (req, res) => {
    userService.getById(req.params.id).then((result) => {
        res.status(200).send({data : result});
    }).catch((error) => {
        res.status(500).send({message : error.toString()})

})})

router.post('/login', async (req, res) => {
  return await signIn(req, res)
})

router.post('/register', async (req, res) => {
  return await registerUser(req, res)
})

router.put('/:id', [auth], async (req, res) => {
  userService
    .updateById(req.params.id, req.body)
    .then((result) => {
      res.status(201).send({ message: 'User was successfully updated', result })
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() })
    })
})

router.delete('/:id', [auth, admin], async (req, res) => {
  await deleteById(req.params.id)
    .then((result) => {
      res.status(201).send({ data: result })
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() })
    })
})

module.exports = router
