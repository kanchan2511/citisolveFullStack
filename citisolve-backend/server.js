import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js"
import complaintRoutes from "./src/routes/complaintRoutes.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();
connectDB();
 
const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"))
app.use("/uploads", express.static("uploads"));


app.use("/api/auth",authRoutes)
app.use("/api/complaints", complaintRoutes);

app.use(errorHandler);


app.get("/", (req,res) => {
    res.send("Citisolve API running");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
