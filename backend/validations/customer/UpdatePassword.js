import validation from "../../libs/validation.js"

export default async (req, res, next) => {
    const rules = {
        "old_password": "required|string|min:6|max:100",
        "password": "required|string|min:6|max:100",
    }
    await validation(req.body, rules, {}, (err, status) => {
        if (!status) {
            res.status(412).json({
                message: 'Validation failed',
                data: err
            })
        } else {
            next()
        }
    })
}
