// MONGOOSE DATA MODEL FOR PROFILES
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  friends: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
      }
    ]
  },
  totalTime: {
    type: [
      {
        week: {
          type: Number
        },
        seconds: {
          type: Number
        }
      }
    ]
  },
  totalPoints: {
    type: [
      {
        week: {
          type: Number
        },
        points: {
          type: Number
        }
      }
    ]
  },
  lastDay: {
    type: Date
  },
  streak: {
    type: Number,
    default: 0
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
