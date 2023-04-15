import AdminRepo from "../../repositories/AdminRepo.js"

export default {
    create: async (req, res) => {
        const {name, username, password} = req.body
        
        try {
            let admin = {name, username, password};
            
            admin = await AdminRepo.create(admin)
            
            res.json({
                "data": {
                    id: admin.id,
                    name: admin.name,
                    username: admin.username,
                },
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({
                "data": {},
                "message": "Admin not created yet, " + err
            })
        }
    },
    show: async (req, res) => {
        try {
            const admin = await AdminRepo.getById(req.params.id)
            
            res.json({
                "data": {
                    id: admin.id,
                    name: admin.name,
                    username: admin.username,
                },
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({"data": {}, "message": err})
        }
    },
    update: async (req, res) => {
        try {
            const {name, username, password} = req.body
            const id = req.params.id

            let admin = await AdminRepo.getById(id)
            if (name) admin.name = name;
            if (username) admin.username = username;
            if (password) admin.password = password;

            await AdminRepo.update(id, admin)
            
            admin = await AdminRepo.getById(id)
            
            res.json({
                "data": {
                    id: admin.id,
                    name: admin.name,
                    username: admin.username,
                },
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({"data": {}, "message": err})
        }
    },
    destroy: async (req, res) => {
        try {
            await AdminRepo.deleteById(req.params.id)
            
            res.json({
                "data": {},
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({"data": {}, "message": err})
        }
    },
    getAdmins: async (req, res) => {
        const limit = req.query.per_page ? req.query.per_page : 10
        const page = req.query.page ? req.query.page : 1

        try {
            const admins = await AdminRepo.getList(limit, page)
            res.json({
                "data": {
                    admins: admins.rows,
                    total: admins.count,
                    current_page: page,
                    per_page: limit
                },
                "message": "Success"
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({"data": {}, "message": "Something went wrong", "error": err})
        }
    }
}