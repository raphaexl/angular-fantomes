const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role:{
      type: String,
      enum: ['Guerrier', 'Alchimiste', 'Sorcier', 'Espions', 'Enchanteur'],
      default: 'Guerrier',
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)