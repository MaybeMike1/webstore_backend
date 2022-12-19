const Mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { User, validate } = require('./../Models/users')
const connection = require('./../StartUp/MongoDb')

const userService = {}

async function hashPassword(plainPass) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(plainPass, salt)
}

async function signIn(req, res) {
  try {
    const { password, email } = req.body
    const claimedUser = await User.findOne({ email: email })

    if (claimedUser == null) {
      return res.status(400).send({ data: 'Username or Password is invalid' })
    }

    const isVerify = await bcrypt.compare(password, claimedUser.password)
    if (isVerify) {
      const token = claimedUser.generateAuthToken()
      delete claimedUser.password
      return res.status(201).send({ token: token, email: claimedUser.email })
    }
  } catch (error) {
    res.status(500).send({ error: error.toString() })
  }
}

async function getById(_id) {
  const user = await User.find({ _id: _id }).catch((error) => {
    throw error
  })
  return user
}
async function getAllUsers() {
  const users = User.find({})

  return users
}

async function deleteById(_id) {
  return await User.findByIdAndDelete(_id)
}

async function registerUser(req, res) {
  const errors = validate(req.body)
  console.log(errors.details)
  if (errors.details) {
    return res.status(400).send({ error: errors })
  }

  let user = req.body
  user['password'] = await hashPassword(req.body.password)

  await connection()
  await User.createIndexes({ checkKeys: true })
  const newUser = await User.create(user).catch((error) => {
    throw error
  })

  const token = newUser.generateAuthToken()
  return res.status(201).send(token)
}

async function updateById(_id, user) {
  const foundUser = await User.findById({ _id: _id })
  if (!foundUser) {
    throw new Error('User not found')
  }
  console.log(user);
  const userD = await User.findByIdAndUpdate({ _id: _id }, { $set: { ...user } })

  const retsVal = await User.findById(_id)

  return userD
}

userService.registerUser = registerUser
userService.signIn = signIn
userService.getAll = getAllUsers
userService.deleteById = deleteById
userService.updateById = updateById
userService.getById = getById

module.exports = userService
