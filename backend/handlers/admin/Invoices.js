import InvoiceRepo from "../../repositories/InvoiceRepo.js";

export default {
    customerInvoices: async (req, res) => {
        const customerId = req.params.customerId
        const limit = req.query.per_page ? req.query.per_page : 10
        const page = req.query.page ? req.query.page : 1

        try {
            const invoices = await InvoiceRepo.getCustomerInvoices(customerId, limit, page)
            
            res.json({
                "data": {
                    data: invoices.rows,
                    total: invoices.count,
                    current_page: page,
                    per_page: limit,
                },
                "message": "Success"
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({"data": {}, "message": "Something went wrong", "error": err})
        }
    }
}