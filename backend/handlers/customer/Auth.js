import CustomerRepo from "../../repositories/CustomerRepo.js"

export default {
    register: async (req, res) => {
        const {name, phone, password, photo, national_id} = req.body
        let customer = {name, phone, password, photo, national_id}
        
        try {
            customer = await CustomerRepo.create(customer)
            const token = await CustomerRepo.updateCustomerToken(customer)

            res.json({
                "data": {
                    name: customer.name,
                    phone: customer.phone,
                    token: token,
                    photo: customer.photo,
                    national_id: customer.national_id
                },
                "message": "Success"
            })
        } catch(err) {
            console.log(err)
            res.status(400)
            .json({
                "data": {},
                "message": "Can`t register in current time",
                "err": err
            })
        }
    }
}