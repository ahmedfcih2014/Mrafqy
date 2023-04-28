import express from 'express'
import Auth from '../handlers/customer/Auth.js'
import CreateCustomer from '../validations/admin/customers/CreateCustomer.js'
import Register from '../validations/customer/Register.js'
import Login from '../validations/customer/Login.js'

const routes = express.Router()

routes.post("/register", Register, Auth.register)
routes.post("/login",Login , Auth.login)

export default routes
