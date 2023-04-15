import ServicesRepo from "../../repositories/ServicesRepo.js"

export default {
    create: async (req, res) => {
        const {name, icon, price, brief} = req.body
        
        try {
            let service = {name, icon, price, brief};
            
            service = await ServicesRepo.create(service)
            
            res.json({
                "data": service,
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({
                "data": {},
                "message": "Service not created yet, " + err
            })
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
    update: async (req, res) => {
        try {
            const {name, icon, price, brief} = req.body
            const id = req.params.id

            let service = await ServicesRepo.getById(id)
            if (name) service.name = name;
            if (icon) service.icon = icon;
            if (price) service.price = price;
            if (brief) service.brief = brief;

            await ServicesRepo.update(id, service)
            
            service = await ServicesRepo.getById(id)
            
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
    destroy: async (req, res) => {
        try {
            await ServicesRepo.deleteById(req.params.id)
            
            res.json({
                "data": {},
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({"data": {}, "message": err})
        }
    },
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
    }
}