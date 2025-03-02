const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.route('/profiles')
  .get(profileController.getAllProfiles);

router.route('/profiles/:userID')
  .get(profileController.getProfile);

router.route('/profiles/:userID/friend/add')
  .post(profileController.addFriend);

router.route('/profiles/:userID/friend/remove')
  .post(profileController.removeFriend);

router.route('/profiles/:userID/time')
  .post(profileController.addTime);

router.route('/profiles/:userID/location')
  .post(profileController.updateLocation);

module.exports = router;