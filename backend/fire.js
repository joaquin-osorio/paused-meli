const firebase = require("firebase");
require("firebase/firestore");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const authDb = db.collection("auth");
const AuthDocRef = authDb.doc("Cba3ElWxYEJ8mS3hQaDM");
const prevRegDb = db.collection("PrevReg");

const getAuth = () => {
  return AuthDocRef.get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    } else {
      console.log("No such document!");
    }
  });
};

const pushAuth = (data) => {
  AuthDocRef.update({
    ACCESS_TOKEN: data.ACCESS_TOKEN,
    REFRESH_TOKEN: data.REFRESH_TOKEN,
  })
    .then(() => console.log("Document successfully written!"))
    .catch((error) => console.error("Error writing document: ", error));
};

const getPrevReg = (nickname) => {
  return prevRegDb
    .doc(nickname)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such document!");
      }
    });
};

const sendPrevReg = (nickname, data) => {
  prevRegDb
    .doc(nickname)
    .set(data)
    .then(() => console.log("Document successfully written!"))
    .catch((error) => console.error("Error writing document: ", error));
};

module.exports = {
  getAuth,
  pushAuth,
  getPrevReg,
  sendPrevReg,
};
