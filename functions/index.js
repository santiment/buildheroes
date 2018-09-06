const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const corsHandler = cors({origin: true});
admin.initializeApp();

exports.addSubscriber = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    const email = req.query.email;
    return admin.database().ref('/emails').push({email}).then((snapshot) => {
      return res.send(200);
    });
  })
});
