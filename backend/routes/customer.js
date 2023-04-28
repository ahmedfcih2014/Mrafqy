import express from 'express'
import Auth from '../handlers/customer/Auth.js'
import CreateCustomer from '../validations/admin/customers/CreateCustomer.js'

const routes = express.Router()

routes.post("/register", CreateCustomer, Auth.register)

export default routes
