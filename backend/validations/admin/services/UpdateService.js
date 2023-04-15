import validation from "../../../libs/validation.js"

export default async (req, res, next) => {
    const rules = {
        "name": "required|string|min:3|max:100",
        "price": "required|numeric|min:0|max:10000000",
        "brief": "string|min:25|max:600",
        "icon": "url",
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
