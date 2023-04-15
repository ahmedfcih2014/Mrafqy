import express from 'express'
import Auth from "../handlers/admin/Auth.js"
import Customer from '../handlers/admin/Customer.js'
import CreateCustomer from '../validations/admin/customers/CreateCustomer.js'
import UpdateCustomer from '../validations/admin/customers/UpdateCustomer.js'
import AdminTokenValid from '../middlewares/AdminTokenValid.js'
import Services from '../handlers/admin/Services.js'
import CreateService from '../validations/admin/services/CreateService.js'
import UpdateService from '../validations/admin/services/UpdateService.js'

const routes = express.Router()

routes.post("/login", Auth.login)

routes.get("/customers", AdminTokenValid, Customer.getCustomers)
routes.post("/customers", AdminTokenValid, CreateCustomer, Customer.create)
routes.get("/customers/:id", AdminTokenValid, Customer.show)
routes.put("/customers/:id", AdminTokenValid, UpdateCustomer, Customer.update)
routes.delete("/customers/:id", AdminTokenValid, Customer.destroy)

routes.get("/services", AdminTokenValid, Services.getServices)
routes.post("/services", AdminTokenValid, CreateService, Services.create)
routes.get("/services/:id", AdminTokenValid, Services.show)
routes.put("/services/:id", AdminTokenValid, UpdateService, Services.update)
routes.delete("/services/:id", AdminTokenValid, Services.destroy)

export default routes
