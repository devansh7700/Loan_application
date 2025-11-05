import { Request, Response, NextFunction } from "express";
import admin from "../../../config/firebase";

//  Set a custom claim (assign role)
export const assignUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid, role } = req.body;

    if (!uid || !role) {
      return res.status(400).json({ message: "UID and role are required" });
    }

    await admin.auth().setCustomUserClaims(uid, { role });

    res.status(200).json({
      message: `Role '${role}' has been assigned to user ${uid}`,
    });
  } catch (error) {
    next(error);
  }
};

//  Retrieve custom claims for a user
export const getUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({ message: "UID is required" });
    }

    const user = await admin.auth().getUser(uid);
    const role = user.customClaims?.role || "No role assigned";

    res.status(200).json({
      uid: user.uid,
      role,
    });
  } catch (error) {
    next(error);
  }
};
