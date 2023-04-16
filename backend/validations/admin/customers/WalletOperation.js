import validation from "../../../libs/validation.js"

export default async (req, res, next) => {
    const rules = {
        "customer_id": "required|exists:customers,id",
        "amount": "required|numeric|min:0.001|max:100000000",
        "note": "string|min:3|max:200",
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
