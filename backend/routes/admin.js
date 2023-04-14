import express from 'express'
import Auth from "../handlers/admin/Auth.js"
import Customer from '../handlers/admin/Customer.js'

const routes = express.Router()

routes.post("/login", Auth.login)

routes.get("/customers", Customer.getCustomers)
routes.post("/customers", Customer.create)
routes.get("/customers/:id", Customer.show)
routes.put("/customers/:id", Customer.update)
routes.delete("/customers/:id", Customer.destroy)

export default routes