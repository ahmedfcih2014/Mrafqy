import express from "express"
import adminRoutes from "./routes/admin.js"
import customerRoutes from "./routes/customer.js"

const app = express()

// parse all requests as json format
app.use(express.json())
app.use("/admin", adminRoutes)
app.use("/customer", customerRoutes)

app.listen(
    8080,
    () => console.log(`server running on http://localhost:8080`)
)