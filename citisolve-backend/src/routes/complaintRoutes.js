import express from "express";
import multer from "multer";
import {
  createComplaint, getComplaints,updateComplaintStatus,
} from "../controllers/complaintController.js";
import { protect, requireRole } from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// MULTER CONFIG (as per instructions: inside routes)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// CREATE (Citizen only)
router.post(
  "/",
  protect,
  requireRole("citizen"),
  upload.single("photo"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("ward").notEmpty().withMessage("Ward is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createComplaint
);
// GET (Citizen/Admin)
router.get("/", protect, getComplaints);

// UPDATE STATUS (Admin only)
router.patch(
  "/:id/status",
  protect,
  requireRole("admin"),
  updateComplaintStatus
);

export default router;