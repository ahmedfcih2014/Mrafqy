import pgPool from "./Connection.js"

export default {
    getCustomerInvoices: async (customerId, limit, page) => {
        const offset = limit * (page - 1)

        const result = await pgPool.query("SELECT * FROM invoices where customer_id = $1 order by id desc limit $2 offset $3", [customerId ,limit, offset])

        const countResult = await pgPool.query("SELECT COUNT(id) as count FROM invoices where customer_id = $1", [customerId])

        return {
            rows: result.rows,
            count: countResult.rows[0].count
        }
    },
}
