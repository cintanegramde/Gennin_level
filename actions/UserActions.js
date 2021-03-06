const UserSchema = require('../models/User')

const searchUserById = (id) => {
  return UserSchema.findById(id)
    .then((user) => user)
    .catch((err) => {
      console.log(`user not exist err ${err}`)
    })
}

const searchUserByEmail = (email) => {
  return UserSchema.findOne({ email })
    .then((user) => user)
    .catch((err) => {
      console.log(`user not exist err ${err}`)
    })
}

const createUser = (data) => {
  const { name, email, level, password } = data
  return UserSchema.create({ name, email, level, password })
    .then((user) => user)
    .catch((err) => {
      console.log(err)
    })
}

const updateUser = (id, data) => {
  return UserSchema.findByIdAndUpdate(id, { $set: data }, { new: true })
    .populate({ path: 'posts' })
    .then((userUpdated) => userUpdated)
}

const user = (id) => {
  return UserSchema.findOne({ _id: id }).exec()
    .populate({ path: 'posts' }).exec()
    .then((user) => {
      return user
    })
    .catch((err) => {
      console.log(`user not exist err ${err}`)
    })
}

const users = () => {
  return UserSchema.find()
    .populate({ path: 'posts' }).exec()
    .then((users) => users)
    .catch((err) => {
      console.log(`user not exist err ${err}`)
    })
}

const addPost = (id, data) => {
  return UserSchema.findOneAndUpdate({ _id: id }, { $addToSet: { posts: data } }, { new: true })
    .populate({ path: 'posts' })
    .then((userUpdated) => userUpdated)
}

module.exports = {
  searchUserById,
  searchUserByEmail,
  createUser,
  updateUser,
  user,
  users,
  addPost
}
