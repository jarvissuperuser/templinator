const functions = require("firebase-functions");

const fire = require("@google-cloud/firestore");
const admin = require("firebase-admin");
const { PubSub } = require("@google-cloud/pubsub");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  // functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.pusher = functions.https.onRequest( (request, response) => {
  const pub = new PubSub();
  pub.topic('ride-request').publishJSON({"msg":"testwhat"}).then(_ =>{
    response.send('done')
  }).catch(_ => {
    response.send(JSON.stringify(_));
  });
});
exports.scheduler = functions.pubsub.topic('ride-request').onPublish(message => {
  const db = new admin.firestore.Firestore();
  // functions.logger.info(message.json);
  // FCM Message Device
  const msgr = admin.messaging();
  msgr.sendAll([message]).then(functions.logger.info).catch(functions.logger.warn);
  db.collection('push-list').doc().set(Object.assign({}, message.json)).then()
      .catch(functions.logger.warn);
});
exports.notifier = functions.https.onRequest((request, response) => null);
