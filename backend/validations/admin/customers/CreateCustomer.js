import validation from "../../../libs/validation.js"

export default async (req, res, next) => {
    const rules = {
        "name": "required|string|min:3|max:100",
        "phone": "required|string|min:8|max:11|exists:customers,phone",
        "password": "required|string|min:6|max:100",
        "photo": "url",
        "national_id": "string"
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
