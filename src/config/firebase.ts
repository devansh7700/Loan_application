import admin from "firebase-admin";
import path from "path";

// Path to your Firebase service account key JSON
const serviceAccount = path.join(__dirname, "../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
