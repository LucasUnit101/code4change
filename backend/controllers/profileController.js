const Profile = require('../models/Profile');
const { Error } = require('mongoose');



// Function to update streak based on lastDay
async function updateStreak(doc) {
  if (!doc) return;

  const lastDay = new Date(doc.lastDay);
  const today = new Date();
  
  // Normalize dates (set to midnight to avoid time differences)
  lastDay.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = (today - lastDay) / (1000 * 60 * 60 * 24); // Difference in days

  if (diff === 1) {
    doc.streak += 1; // Continue the streak
  } else if (diff > 1) {
    doc.streak = 0; // Reset streak
  }

  doc.lastDay = today; // Update lastDay
  await doc.save();
}

// @desc Get profile data of a user
// @route GET /profiles/:userID
// @access Public
const getProfile = async (req, res) => {
  try {
    const { userID } = req.params;

    if (userID === undefined) {
      return res.status(400).send('Please provide a user ID!');
    }

    const profile = await Profile.findOne({ user: userID }).exec();
    if (!profile) {
      return res.status(404).send();
    }

    // Update streak if necessary
    await updateStreak(profile);
    
    return res.status(200).json({
      friends: profile.friends,
      totalTime: profile.totalTime,
      totalPoints: profile.totalPoints,
      streak: profile.streak
    });
  } 
  catch (err) { // Server error (Probably a Mongoose connection issue)
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

// @desc Update friends of a profile
// @route POST /profiles/:profileID/friends
const updateFriends = async (req, res) => {
  try {
    const { profileID } = req.params;

    if (profileID === undefined) {
      return res.status(400).send('Please provide a profile ID!');
    }

    const profile = await Profile.findOne({ _id: profileID }).exec();
    if (!profile) {
      return res.status(404).send();
    }

    const friends = req.body.friends;
    if (!friends) {
      return res.status(400).send('Please provide friends!');
    }
    
    profile.friends = friends;
    await profile.save();

    return res.status(200).send();
  } 
  catch (err) { // Server error (Probably a Mongoose connection issue)
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

module.exports = { getProfile, updateFriends };