const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleCallback = async (req, res) => {
  const { code } = req.query;

      const { data } = await axios.post(`https://oauth2.googleapis.com/token`, null, {
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:5000/auth/google/callback',
        grant_type: 'authorization_code',
      },
    });
    console.log(data);
  try {
    const ticket = await client.verifyIdToken({
      idToken: data.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { sub: googleId, email } = payload;

    const existingUser = await User.findOne({ googleId });
    console.log(payload);
    if (existingUser) {
      // Update token if user already exists
      existingUser.accessToken = data.access_token;
      await existingUser.save();
    } else {
      // Create a new user if it does not exist
      const newUser = new User({
        googleId,
        accessToken: data.access_token,
        email,
      });
      await newUser.save();
    }

    res.redirect(`http://localhost:3000?token=${data.access_token}`);
  } catch (error) {
    console.error('Error during Google callback:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { googleCallback };


