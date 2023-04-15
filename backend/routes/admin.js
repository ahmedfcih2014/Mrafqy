import express from 'express'
import Auth from "../handlers/admin/Auth.js"
import Customer from '../handlers/admin/Customer.js'
import CreateCustomer from '../validations/admin/customers/CreateCustomer.js'
import UpdateCustomer from '../validations/admin/customers/UpdateCustomer.js'
import AdminRepo from '../repositories/AdminRepo.js'

const routes = express.Router()

routes.post("/login", Auth.login)

const authMiddleware = async (req, res, next) => {
    const token = req.headers['x-admin-token']
    if (!token) return res.status(401).json({"data": {}, "message": "Unauthorized"})

    try {
        await AdminRepo.validToken(token)
        next()
    } catch (err) {
        return res.status(401).json({"data": {}, "message": "Unauthorized"})
    }
}

routes.get("/customers", authMiddleware, Customer.getCustomers)
routes.post("/customers", authMiddleware, CreateCustomer, Customer.create)
routes.get("/customers/:id", authMiddleware, Customer.show)
routes.put("/customers/:id", authMiddleware, UpdateCustomer, Customer.update)
routes.delete("/customers/:id", authMiddleware, Customer.destroy)

export default routes
