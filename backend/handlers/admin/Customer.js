import CustomerRepo from "../../repositories/CustomerRepo.js"

export default {
    create: async (req, res) => {
        const {name, phone, password, photo, national_id} = req.body
        
        try {
            let customer = {name, phone, password, photo, national_id};
            
            customer = await CustomerRepo.create(customer)
            
            res.json({
                "data": customer,
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({
                "data": {},
                "message": "Customer not created yet, " + err
            })
        }
    },
    show: async (req, res) => {
        try {
            const customer = await CustomerRepo.getById(req.params.id)
            
            res.json({
                "data": {
                    id: customer.id,
                    name: customer.name,
                    phone: customer.phone,
                    national_id: customer.national_id,
                    photo: customer.photo,
                },
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({"data": {}, "message": err})
        }
    },
    update: async (req, res) => {
        try {
            const {name, phone, password, photo, national_id} = req.body
            const id = req.params.id

            let customer = await CustomerRepo.getById(id)
            if (name) customer.name = name;
            if (phone) customer.phone = phone;
            if (password) customer.password = password;
            if (photo) customer.photo = photo;
            if (national_id) customer.national_id = national_id;

            await CustomerRepo.update(id, customer)
            
            customer = await CustomerRepo.getById(id)
            
            res.json({
                "data": {
                    id: customer.id,
                    name: customer.name,
                    phone: customer.phone,
                    national_id: customer.national_id,
                    photo: customer.photo,
                },
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({"data": {}, "message": err})
        }
    },
    destroy: async (req, res) => {
        try {
            await CustomerRepo.deleteById(req.params.id)
            
            res.json({
                "data": {},
                "message": "Success"
            })
        } catch(err) {
            res.status(400).json({"data": {}, "message": err})
        }
    },
    getCustomers: async (req, res) => {
        const limit = req.query.per_page ? req.query.per_page : 10
        const page = req.query.page ? req.query.page : 1

        try {
            const customers = await CustomerRepo.getList(limit, page)
            res.json({
                "data": {
                    customers: customers.rows,
                    total: customers.count,
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