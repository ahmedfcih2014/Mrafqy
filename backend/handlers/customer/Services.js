import ServicesRepo from "../../repositories/ServicesRepo.js"

export default {
    getServices: async (req, res) => {
        const limit = req.query.per_page ? req.query.per_page : 10
        const page = req.query.page ? req.query.page : 1

        try {
            const services = await ServicesRepo.getList(limit, page)
            res.json({
                "data": {
                    services: services.rows,
                    total: services.count,
                    current_page: page,
                    per_page: limit
                },
                "message": "Success"
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({"data": {}, "message": "Something went wrong", "error": err})
        }
    },
    show: async (req, res) => {
        try {
            const service = await ServicesRepo.getById(req.params.id)
            
            res.json({
                "data": {
                    id: service.id,
                    name: service.name,
                    price: service.price,
                    icon: service.icon,
                    brief: service.brief,
                },
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({"data": {}, "message": err})
        }
    },
}