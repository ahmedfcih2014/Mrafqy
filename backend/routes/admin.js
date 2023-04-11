import express from 'express'
import Auth from "../handlers/admin/Auth.js"

const routes = express.Router()

routes.post("/login", Auth.login)

export default routes