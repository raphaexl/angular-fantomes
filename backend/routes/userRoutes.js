const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updateUser,
  getMe,
  getUser,
  getAllUsers,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register',  registerUser);
router.post('/login', loginUser);
router.put('/update/:id', protect, updateUser);
router.get('/me', protect, getMe);
router.get('/user/:id', protect, getUser);
router.get('/all',  protect, getAllUsers);

module.exports = router