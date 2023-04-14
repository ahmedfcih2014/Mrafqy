import AdminRepo from "../../repositories/AdminRepo.js"

export default {
    login: async (req, res) => {
        const {user, password} = req.body
        
        try {
            const admin = await AdminRepo.adminLogin(user, password)
            res.json({
                "data": {id: admin.id, name: admin.name, token: admin.token},
                "message": "Success"
            })
        } catch(err) {
            res.status(401).json({
                "data": {},
                "message": "Unauthorized"
            })
        }
    }
}