import express from 'express'
import Auth from '../handlers/customer/Auth.js'
import Register from '../validations/customer/Register.js'
import Login from '../validations/customer/Login.js'
import CustomerTokenValid from '../middlewares/CustomerTokenValid.js'
import Profile from '../handlers/customer/Profile.js'

const routes = express.Router()

routes.post("/register", Register, Auth.register)
routes.post("/login", Login, Auth.login)

routes.get("/profile", CustomerTokenValid, Profile.getProfile)

export default routes
