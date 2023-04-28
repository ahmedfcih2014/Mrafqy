import CustomerRepo from "../repositories/CustomerRepo.js"

export default async (req, res, next) => {
    const token = req.headers['x-api-token']
    if (!token) return res.status(401).json({"data": {}, "message": "Unauthorized"})

    try {
        req.customer = await CustomerRepo.customerByToken(token)
        next()
    } catch (err) {
        return res.status(401).json({"data": {}, "message": "Unauthorized"})
    }
}