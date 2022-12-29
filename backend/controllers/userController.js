const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

const getUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(400)
    throw new Error('Requested User not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  res.status(200).json(user)
});

// @desc    Get users data
// @route   GET /api/users/all
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users)
})

// @desc    Put user data
// @route   PUT /api/users/update/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const { role, friend, action } = req.body
  if (!user) {
    res.status(400)
    throw new Error('Requested User not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  
  // Make sure the logged in user matches the Friend Req user
  if (user.id.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  let updateParams = {}
  let friendParams = {}

    if (role){
      updateParams.role = role;
    }
  
    updateParams.friends = user.friends;
    //If we found the friend 
    if (friend){
      if (action){
        const found = user.friends.find(_userid => _userid.toString() === friend);
        console.log("user ", user.friends, " found ? :", found);
        //Check among all users
        const req_user = await User.findById(friend)
            if (!req_user) {
              res.status(400)
              throw new Error('Requested User not found')
        }
        friendParams.friends = req_user.friends;
        let dirty = false; //Dirty when we add or remove a friend
        if (action.toLowerCase() === 'add'){
          if (!found){ //He is not friend add him
            updateParams.friends.push(req_user._id);
            friendParams.friends.push(user._id);
            dirty = true;
          }
        }else if(action.toLowerCase() === 'remove'){
          if (found){ // He was a friend remove him
            updateParams.friends = updateParams.friends.filter(_userid => _userid === found._id)
            friendParams.friends = friendParams.friends.filter(_userid => _userid === found._id);
            dirty = true;
            //console.log("deleting");
          }
        }
        if (dirty){
        //  console.log("Before ", friendParams)

          const friendUpdate = await User.findByIdAndUpdate(friend, friendParams, {
            new: true,
          })
         // console.log("After");
        }
      }
    }
    console.log("update params ", updateParams)
  const updatedUser = await User.findByIdAndUpdate(req.params.id, updateParams, {
    new: true,
  })

  res.status(200).json(updatedUser)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getMe,
  getUser,
  getAllUsers,
}