import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;

    const user = await admin.auth().getUser(uid);

    res.status(200).json({
      message: "User details retrieved successfully",
      user: {
        uid: user.uid,
        email: user.email,
        role: user.customClaims?.role || "No role assigned",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const setUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid, role } = req.body;

    if (!uid || !role) {
      return res.status(400).json({ message: "UID and role are required" });
    }

    await admin.auth().setCustomUserClaims(uid, { role });

    res.status(200).json({
      message: `Role '${role}' assigned successfully to user with UID: ${uid}`,
    });
  } catch (error) {
    next(error);
  }
};
