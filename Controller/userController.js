const router = require('express').Router()
const Mongoose = require('mongoose')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const errors = require('../middleware/errors')
const validateObjectId = require('../middleware/validateObjectId')
const userService = require('./../Service/userService')
const {
  registerUser,
  signIn,
  getAll,
  deleteById,
} = require('./../Service/userService')

router.use(errors)

router.get('/', [auth, admin], async (req, res) => {
  const users = getAll()
    .then((result) => {
      res.status(200).send({ data: result })
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() })
    })
})

router.put('/reset-password', [auth], async (req, res) => {
  await userService.resetPassword(req, res)
})

router.get('/:id', [validateObjectId, auth, admin], (req, res) => {
  userService
    .getById(req.params.id)
    .then((result) => {
      res.status(200).send({ data: result })
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: 'Something went wrong... Please try again' })
    })
})

router.post('/login', errors, async (req, res) => {
  return await signIn(req, res)
})

router.post('/register', async (req, res) => {
  return await registerUser(req, res)
})

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  userService
    .updateById(req.params.id, req.body)
    .then((result) => {
      res.status(201).send({ message: 'User was successfully updated', result })
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() })
    })
})

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  await deleteById(req.params.id)
    .then((result) => {
      res.status(201).send({ data: result })
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() })
    })
})

module.exports = router
