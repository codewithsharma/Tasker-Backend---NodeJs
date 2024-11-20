import express from "express"
import indexRoute from "./routes/routes"
const cors = require('cors');
import { connectDb } from "./utils/features"

connectDb()
const app = express()
app.use(cors({
    origin: 'http://localhost:4200' 
}));
const port = 4000
app.use(express.json())
app.use("/", indexRoute)
app.listen(port)