import InvoiceRepo from "../../repositories/InvoiceRepo.js"

export default {
    invoices: async (req, res) => {
        try {
            const limit = req.query.per_page ? req.query.per_page : 10
            const page = req.query.page ? req.query.page : 1

            const customer = req.customer
            const invoices = await InvoiceRepo.getCustomerInvoices(customer.id, limit, page)

            res.json({
                "data": {
                    "invoices": invoices.rows,
                    "count": invoices.count,
                },
                "message": "Success"
            })
        } catch (err) {
            res.status(400)
            .json({
                "data": {},
                "message": "Can`t get invoices in current time",
                "err": err
            })
        }
    },
    showInvoice: async (req, res) => {
        try {
            const customer = req.customer
            const invoice = await InvoiceRepo.getCustomerInvoice(customer.id, req.params.id)

            res.json({
                "data": invoice,
                "message": "Success"
            })
        } catch (err) {
            res.status(400)
            .json({
                "data": {},
                "message": "Can`t get invoice in current time",
                "err": err
            })
        }
    },
}