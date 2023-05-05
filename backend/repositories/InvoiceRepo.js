import config from "../config.js"
import serials from "../libs/serials.js"
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
    createInvoice: async (customerId, service) => {
        const vat = parseFloat(service.price) * config.vatPercentage / 100
        const tax = vat * config.taxPercentage / 100
        const now = new Date()

        const data = {
            customer_id: customerId,
            service_id: service.id,
            total: service.price,
            tax: tax,
            vat: vat,
            serial: serials.generateSerial(10),
            created_at: now,
            updated_at: now,
        }
        const attributes = Object.keys(data).join()
        const values = Object.values(data)
        const valuesNumbers = values.map((v, i) => '$' + (i+1)).join()

        const result = await pgPool.query(`INSERT INTO invoices (${attributes}) VALUES (${valuesNumbers}) RETURNING *`, values)
        
        if (result.rowCount <= 0) throw "Invoice not created for current time, try again later"
        return result.rows[0]
    },
    getCustomerInvoice: async (customerId, invoiceId) => {
        const result = await pgPool.query("SELECT * FROM invoices where customer_id = $1 and id = $2", [customerId ,invoiceId])
        if (result.rowCount <= 0) throw "Invoice not found"

        return result.rows[0]
    },
}
