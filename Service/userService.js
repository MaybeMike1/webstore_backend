const Mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { User, validate, validatePassword } = require('./../Models/users')
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
async function resetPassword(req, res) {
  try {
    const { error } = validatePassword(req.body)

    if (error) {
      return res.status(400).send({ message: error.details[0].message })
    }

    const user = await User.findOne({ _id: req.user._id })

    const isValidPassword = await bcrypt.compare(
      req.body.oldPassword,
      user.password,
    )

    if (!isValidPassword) {
      return res.status(400).send({ message: 'Old password is invalid' })
    }

    await User.findOne({ _id: req.user._id })
      .updateOne({ password: await hashPassword(req.body.password) })
      .exec()
      .then((data) => {
        res.status(201).send({ message: 'Password was successfully updated' })
      })
      .catch((error) => {
        res.status(500).send({
          message: 'Something went wrong... While processing new password',
        })
      })
  } catch (error) {
    res
      .status(500)
      .send({
        message: 'Something went wrong... On server',
        error: error.toString(),
      })
  }
}

async function getById(_id) {
  const user = await User.findOne({ _id: _id }).catch((error) => {
    throw error
  })

  const userObject = user.toObject()
  delete userObject.password

  return userObject
}
async function getAllUsers() {
  const users = await User.find({}).exec()

  const returnUsers = users.map((user) => {
    const userObject = user.toObject()
    delete userObject.password
    return userObject
  })

  return returnUsers
}

async function deleteById(_id) {
  return await User.findByIdAndDelete(_id)
}

async function registerUser(req, res) {
  const { error } = validate(req.body)

  if (error) {
    return res.status(400).send({ message: error.details[0].message })
  }

  const userEmailExists = await User.findOne({ email: req.body.email })

  const userNameExists = await User.findOne({ userName: req.body.userName })

  console.log(userEmailExists, userNameExists)

  if (userEmailExists || userNameExists) {
    return res.status(400).send({ message: 'User already exists' })
  }

  let user = req.body
  user['password'] = await hashPassword(req.body.password)

  const newUser = new User(user)

  const token = newUser.generateAuthToken()

  await newUser.save();
  
  return res.status(201).send(token)
}

async function updateById(_id, user) {
  const foundUser = await User.findById({ _id: _id })
  if (!foundUser) {
    throw new Error('User not found')
  }
  const userD = await User.findByIdAndUpdate(
    { _id: _id },
    { $set: { ...user } },
  )

  const retsVal = await User.findById(_id)

  return retsVal
}

userService.registerUser = registerUser
userService.signIn = signIn
userService.getAll = getAllUsers
userService.deleteById = deleteById
userService.updateById = updateById
userService.getById = getById
userService.resetPassword = resetPassword

module.exports = userService
