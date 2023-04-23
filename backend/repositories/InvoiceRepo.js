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
    lastServices: async (limit) => {
        const select = [
            "invoices.total as invoice_total",
            "invoices.tax as invoice_tax",
            "invoices.vat as invoice_vat",
            "invoices.serial as invoice_serial",
            "services.name as service_name",
            "services.icon as service_icon",
            "services.price as service_price",
            "customers.name as customer_name",
        ]
        const result = await pgPool.query(
            `SELECT ${select.join(",")}
            FROM invoices
            JOIN customers ON invoices.customer_id = customers.id
            JOIN services ON invoices.service_id = services.id
            ORDER BY invoices.id DESC limit $1`,
            [limit]
        )

        return result.rows
    },
}
