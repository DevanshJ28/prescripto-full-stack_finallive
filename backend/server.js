import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

const app = express()
const port = process.env.PORT || 4000

// Connect Services
connectDB()
connectCloudinary()

// Middleware
app.use(express.json())

// ✅ AUTOMATIC CORS CONFIGURATION
// This will work regardless of your new Vercel links
app.use(cors({
    origin: (origin, callback) => {
        // Allows any Vercel URL, Localhost, or requests with no origin (like mobile/Postman)
        if (!origin || origin.endsWith(".vercel.app") || origin.includes("localhost")) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

// API Endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});
//will work
app.listen(port, () => console.log(`Server started on PORT:${port}`))