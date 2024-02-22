// routes/facebook.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/login', async (req, res) => {
  try {
    // Redirect to Facebook login dialog
    const redirectUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=manage_pages,pages_manage_metadata,pages_read_engagement,pages_show_list,pages_manage_ads,user_events,user_managed_groups,user_pages,user_photos,user_videos`;
    res.send({ redirectUrl });
  } catch (error) {
    console.error('Error connecting with Facebook:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    // Exchange code for access token
    const response = await axios.get(`https://graph.facebook.com/v12.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}`);
    const accessToken = response.data.access_token;
    // Store or use the access token as needed
    res.send({ accessToken });
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;