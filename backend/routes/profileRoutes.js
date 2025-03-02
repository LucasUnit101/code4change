const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.route('/profiles/:userID')
  .get(profileController.getProfile);

router.route('/profiles/:profileID/friend/add')
  .post(profileController.addFriend);

router.route('/profiles/:profileID/friend/remove')
  .post(profileController.removeFriend);

router.route('/profiles/:profileID/time')
  .post(profileController.addTime);

module.exports = router;