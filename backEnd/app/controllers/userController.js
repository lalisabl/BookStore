const User = require('../models/UserModel')
const catchAsync = require('../../utils/catchAsync')

//create user account code start here
exports.createNewAccount = catchAsync(async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName
  })
})

// get all user code start here
exports.getAllUsers = async (req, res) => {
  console.log(req.body)
  res.status(200).json({ data: req.body })
}
