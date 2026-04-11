// helpers/utils/db/index.ts
import admin from "firebase-admin";

try {
  console.log("Initializing Firebase admin...");

  const serviceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
      ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/gm, "\n")
      : undefined,
    // privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    // privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
    //   ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/gm, "\n")
    //   : undefined,
  };

  console.log("PROJECT_ID:", process.env.FIREBASE_ADMIN_PROJECT_ID);
  console.log("CLIENT_EMAIL:", process.env.FIREBASE_ADMIN_CLIENT_EMAIL);
  console.log(
    "PRIVATE_KEY starts with:",
    process.env.FIREBASE_ADMIN_PRIVATE_KEY?.slice(0, 50),
  );

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Error during Firebase initialization:", error);
}

export const db = admin.firestore();

export const firebase = admin;
