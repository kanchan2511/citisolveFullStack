import mongoose from "mongoose";
import { nanoid } from "nanoid"

const complaintSchema = new mongoose.Schema({
    complaintId: {
        type: String,
        default: () => nanoid(6),
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: { type: String, required: true },
    ward: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String },   // store filename
    status: {
        type: String,
        enum: ["Open", "In Progress", "Resolved"],
        default: "Open"
    },
    resolutionNote: { type: String }
},
{ timestamps: true });


export default mongoose.model("Complaint", complaintSchema);