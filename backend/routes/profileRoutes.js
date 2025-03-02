const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.route('/profiles/:userID')
  .get(profileController.getProfile);

router.route('/profiles/:profileID/friends')
  .get(profileController.updateFriends);

module.exports = router;