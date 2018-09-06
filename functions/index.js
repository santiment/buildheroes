const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const corsHandler = cors({origin: true});
admin.initializeApp();

const db = admin.database()
const emailsRef = db.ref('emails')

exports.addSubscriber = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    const email = req.query.email;
    return admin.database().ref('/emails').push({email}).then((snapshot) => {
      return res.send(200);
    });
  })
});

exports.subscriptions = functions.https.onRequest((req, res) => {
  db.ref('stats').child('subscriptions').once('value', function(snapshot) {
    return res.status(200).send(`Subscriptions: ${snapshot.val()} | <a href="${snapshot.ref.toString()}">go to data</a>`);
  })
});

exports.addSubscriptions = functions.database.ref('/emails/{pushId}/email').onCreate((snap, context) => {
  db.ref('stats').child('subscriptions').once('value', function(snapshot) {
    const subscriptions = parseInt(snapshot.val() || 0, 10) + 1
    db.ref('stats').set({subscriptions})
  })
});

exports.removeSubscriptions = functions.database.ref('/emails/{pushId}/email').onDelete((snap, context) => {
  db.ref('stats').child('subscriptions').once('value', function(snapshot) {
    const subscriptions = parseInt(snapshot.val() || 0, 10) - 1
    db.ref('stats').set({subscriptions})
  })
});
