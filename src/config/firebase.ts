import admin from "firebase-admin";
import path from "path";

try {
// Path to your Firebase service account key JSON
const serviceAccount = path.join(__dirname, "../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

} catch (err) {
  
  admin.initializeApp();
  console.log("Firebase initialized without credentials (test mode)");
}

export default admin;
