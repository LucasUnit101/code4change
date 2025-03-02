const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { Error } = require("mongoose");

// Function to update streak based on lastDay
async function updateStreak(doc) {
  if (!doc) return;

  const lastDay = new Date(doc.lastDay ?? -8640000000000000);
  const today = new Date();

  // Normalize dates (set to midnight to avoid time differences)
  lastDay.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = (today - lastDay) / (1000 * 60 * 60 * 24); // Difference in days

  if (diff === 1) {
    doc.streak += 1; // Continue the streak
  } else if (diff > 1) {
    doc.streak = 1; // Reset streak
  }

  doc.lastDay = today; // Update lastDay
  await doc.save();
}

// @desc Get all profiles
// @route GET /profiles
// @access Public
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({}).exec();
    if (!profiles || profiles.length === 0) {
      return res.status(404).send();
    }

    return res.status(200).json(
      profiles.map((profile) => ({
        id: profile._id.toString().replace(/['"]+/g, ""),
        name: profile.name,
        friends: profile.friends.map((id) =>
          id.toString().replace(/['"]+/g, "")
        ),
        totalTime: profile.totalTime,
        totalPoints: profile.totalPoints,
        streak: profile.streak,
      }))
    );
  } catch (err) {
    // Server error (Probably a Mongoose connection issue)
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// @desc Get profile data of a user
// @route GET /profiles/:userID
// @access Public
const getProfile = async (req, res) => {
  try {
    const { userID } = req.params;

    if (userID === undefined) {
      return res.status(400).send("Please provide a user ID!");
    }

    const profile = await Profile.findOne({ user: userID }).exec();
    if (!profile) {
      return res.status(404).send();
    }

    // Update streak if necessary
    await updateStreak(profile);

    return res.status(200).json({
      id: profile._id.toString().replace(/['"]+/g, ""),
      name: profile.name,
      friends: profile.friends.map((id) => id.toString().replace(/['"]+/g, "")),
      totalTime: profile.totalTime,
      totalPoints: profile.totalPoints,
      streak: profile.streak,
    });
  } catch (err) {
    // Server error (Probably a Mongoose connection issue)
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// @desc Add a friend to a profile
// @route POST /profiles/:userID/friend/add
const addFriend = async (req, res) => {
  try {
    const { userID } = req.params;

    if (userID === undefined) {
      return res.status(400).send("Please provide a user ID!");
    }

    const profile = await Profile.findOne({ user: userID }).exec();
    if (!profile) {
      return res.status(404).send();
    }

    const friendID = req.body.friendID;
    if (!friendID) {
      return res.status(400).send("Please provide a friend ID to add!");
    }

    const friend = await User.findOne({ username: friendID }).exec();
    if (!friend) {
      return res.status(400).send("Friend ID is an invalid username!");
    }

    const friendProfile = await Profile.findOne({ user: friend._id }).exec();

    if (profile.friends.includes(friendProfile._id)) {
      return res.status(400).send("You cannot add an existing friend!");
    }

    profile.friends.push(friendProfile._id);
    await profile.save();

    return res.status(200).send();
  } catch (err) {
    // Server error (Probably a Mongoose connection issue)
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// @desc Remove a friend from a profile
// @route POST /profiles/:userID/friend/remove
const removeFriend = async (req, res) => {
  try {
    const { userID } = req.params;

    if (userID === undefined) {
      return res.status(400).send("Please provide a user ID!");
    }

    const profile = await Profile.findOne({ user: userID }).exec();
    if (!profile) {
      return res.status(404).send();
    }

    const friendID = req.body.friendID;
    if (!friendID) {
      return res.status(400).send("Please provide a friend ID to remove!");
    }

    const friend = await User.findOne({ username: friendID }).exec();
    if (!friend) {
      return res.status(400).send("Friend ID is an invalid username!");
    }

    const friendProfile = await Profile.findOne({ user: friend._id });

    if (!profile.friends.includes(friendProfile._id)) {
      return res.status(400).send("You cannot remove a non-existing friend!");
    }

    profile.friends = profile.friends.filter(
      id => id !== friendProfile._id
    );
    await profile.save();

    return res.status(200).send();
  } catch (err) {
    // Server error (Probably a Mongoose connection issue)
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const getWeekNumber = () => {
  const date = new Date();
  const startDate = new Date(1970, 0, 1); // Start from January 1, 1970 (UNIX epoch)
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000)); // Total days passed
  return Math.floor(days / 7); // Calculate weeks passed
};

// @desc Add time spent studying
// @route POST /profiles/:userID/time
const addTime = async (req, res) => {
  try {
    const { userID } = req.params;

    if (userID === undefined) {
      return res.status(400).send("Please provide a user ID!");
    }

    const profile = await Profile.findOne({ user: userID }).exec();
    if (!profile) {
      return res.status(404).send();
    }

    const time = req.body.time;
    const currentWeek = getWeekNumber();

    const timeIdx = profile.totalTime.findIndex(
      (entry) => entry.week === currentWeek
    );
    if (timeIdx === -1) {
      profile.totalTime.push({
        week: currentWeek,
        seconds: time,
      });
    } else {
      profile.totalTime[timeIdx].seconds += time;
    }

    // Update streak
    await updateStreak(profile);

    // Calculate points
    const points = 0;

    const pointsIdx = profile.totalPoints.findIndex(
      (entry) => entry.week === currentWeek
    );
    if (pointsIdx === -1) {
      profile.totalPoints.push({
        week: currentWeek,
        points: points,
      });
    } else {
      profile.totalPoints[pointsIdx].points += points;
    }

    await profile.save();
    return res.status(200).send();
  } catch (err) {
    // Server error (Probably a Mongoose connection issue)
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = {
  getAllProfiles,
  getProfile,
  addFriend,
  removeFriend,
  addTime,
};
