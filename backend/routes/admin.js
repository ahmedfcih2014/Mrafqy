import express from 'express'
import Auth from "../handlers/admin/Auth.js"
import Customer from '../handlers/admin/Customer.js'
import CreateCustomer from '../validations/admin/customers/CreateCustomer.js'
import UpdateCustomer from '../validations/admin/customers/UpdateCustomer.js'
import AdminTokenValid from '../middlewares/AdminTokenValid.js'
import Services from '../handlers/admin/Services.js'
import CreateService from '../validations/admin/services/CreateService.js'
import UpdateService from '../validations/admin/services/UpdateService.js'
import Admins from '../handlers/admin/Admins.js'
import UpdateAdmin from '../validations/admin/admins/UpdateAdmin.js'
import CreateAdmin from '../validations/admin/admins/CreateAdmin.js'
import WalletOperation from '../validations/admin/customers/WalletOperation.js'
import Wallet from '../handlers/admin/Wallet.js'
import Invoices from '../handlers/admin/Invoices.js'
import Dashboard from '../handlers/admin/Dashboard.js'

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

routes.get("/admins", AdminTokenValid, Admins.getAdmins)
routes.post("/admins", AdminTokenValid, CreateAdmin, Admins.create)
routes.get("/admins/:id", AdminTokenValid, Admins.show)
routes.put("/admins/:id", AdminTokenValid, UpdateAdmin, Admins.update)
routes.delete("/admins/:id", AdminTokenValid, Admins.destroy)

routes.post("/wallet/withdraw", AdminTokenValid, WalletOperation, Wallet.withdraw)
routes.post("/wallet/deposit", AdminTokenValid, WalletOperation, Wallet.deposit)
routes.get("/wallet/:customerId", AdminTokenValid, Wallet.showByCustomer)

routes.get("/customer-report/:customerId", AdminTokenValid, Customer.customerReport)
routes.get("/customer-report/:customerId/transactions", AdminTokenValid, Wallet.customerTransactions)
routes.get("/customer-report/:customerId/invoices", AdminTokenValid, Invoices.customerInvoices)

routes.get("/dashboard", AdminTokenValid, Dashboard.dashboard)

export default routes
