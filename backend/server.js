import express from "express"
import adminRoutes from "./routes/admin.js"

const app = express()

// parse all requests as json format
app.use(express.json())
app.use("/admin", adminRoutes)

app.listen(
    8080,
    () => console.log(`server running on http://localhost:8080`)
)