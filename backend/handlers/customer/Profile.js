import CustomerRepo from "../../repositories/CustomerRepo.js"

export default {
    getProfile: async (req, res) => {
        res.json({
            "data": {
                id: req.customer.id,
                name: req.customer.name,
                phone: req.customer.phone,
                token: req.customer.token,
                photo: req.customer.photo,
                national_id: req.customer.national_id
            },
            "message": "Success"
        })
    },
    editProfile: async (req, res) => {
        try {
            let customer = req.customer
            customer.name = req.body.name
            customer.phone = req.body.phone
            customer.photo = req.body.photo
            customer.national_id = req.body.national_id

            await CustomerRepo.update(customer.id, customer)

            res.json({
                "data": {
                    name: customer.name,
                    phone: customer.phone,
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
                "message": "Can`t update profile in current time",
                "err": err
            })
        }
    },
    updatePassword: async (req, res) => {
        const {old_password, password} = req.body

        try {
            let customer = req.customer
            if (customer.password != old_password) throw "Wrong Old Password"

            customer.password = password

            await CustomerRepo.update(customer.id, customer)

            res.json({
                "data": {},
                "message": "Success"
            })
        } catch(err) {
            console.log(err)
            res.status(400)
            .json({
                "data": {},
                "message": "Can`t update password in current time",
                "err": err
            })
        }
    },
}