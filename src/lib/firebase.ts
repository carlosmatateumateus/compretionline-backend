import admin from "firebase-admin"

export const BUCKET = "compretionline.appspot.com"

const firebaseKeys = {
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  projectId: process.env.PROJECT_ID
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseKeys),
  storageBucket: BUCKET
});

export const bucket = admin.storage().bucket()