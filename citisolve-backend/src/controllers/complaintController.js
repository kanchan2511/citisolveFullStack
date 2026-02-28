import Complaint from "../models/Complaint.js";

// CREATE COMPLAINT (Citizen only)
export const createComplaint = async (req, res) => {
  try {
    const { name, ward, location, category, description } = req.body;

    const complaint = await Complaint.create({
      user: req.user._id,
      name,
      ward,
      location,
      category,
      description,
      photo: req.file ? req.file.filename : null,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET COMPLAINTS (Role-based)
export const getComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.user.role === "admin") {
      complaints = await Complaint.find().sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find({ user: req.user._id })
        .sort({ createdAt: -1 });
    }

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS (Admin only)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, resolutionNote } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // If resolving, require resolution note
    if (status === "Resolved" && !resolutionNote) {
      return res
        .status(400)
        .json({ message: "Resolution note is required when resolving." });
    }

    complaint.status = status;
    if (resolutionNote) {
      complaint.resolutionNote = resolutionNote;
    }

    await complaint.save();

    res.json({ message: "Status updated successfully", complaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};