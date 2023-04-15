import AdminRepo from "../repositories/AdminRepo.js"

export default async (req, res, next) => {
    const token = req.headers['x-admin-token']
    if (!token) return res.status(401).json({"data": {}, "message": "Unauthorized"})

    try {
        await AdminRepo.validToken(token)
        next()
    } catch (err) {
        return res.status(401).json({"data": {}, "message": "Unauthorized"})
    }
}