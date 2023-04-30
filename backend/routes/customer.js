import express from 'express'
import Auth from '../handlers/customer/Auth.js'
import Register from '../validations/customer/Register.js'
import Login from '../validations/customer/Login.js'
import CustomerTokenValid from '../middlewares/CustomerTokenValid.js'
import Profile from '../handlers/customer/Profile.js'
import EditProfile from '../validations/customer/EditProfile.js'
import UpdatePassword from '../validations/customer/UpdatePassword.js'
import Home from '../handlers/customer/Home.js'
import Services from '../handlers/customer/Services.js'

const routes = express.Router()

routes.post("/register", Register, Auth.register)
routes.post("/login", Login, Auth.login)

routes.get("/profile", CustomerTokenValid, Profile.getProfile)
routes.post("/profile", CustomerTokenValid, EditProfile, Profile.editProfile)
routes.post("/profile/change-password", CustomerTokenValid, UpdatePassword, Profile.updatePassword)
routes.get("/home", CustomerTokenValid, Home.getHome)
routes.get("/services", CustomerTokenValid, Services.getServices)
routes.get("/services/:id", CustomerTokenValid, Services.show)

export default routes
