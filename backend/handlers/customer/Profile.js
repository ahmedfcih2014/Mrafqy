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
}