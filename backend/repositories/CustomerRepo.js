import pgPool from "./Connection.js"

export default {
    create: async (customer) => {
        if (!customer.name || !customer.phone || !customer.password) throw "Required customer fields missed";
        
        const now = new Date()
        const result = await pgPool.query(
            "INSERT INTO customers (name, phone, password, photo, national_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
                customer.name,
                customer.phone,
                customer.password,
                customer.photo ? customer.photo : null,
                customer.national_id ? customer.national_id : null,
                now,
                now,
            ]
        )
        
        if (result.rowCount <= 0) throw "Customer not created for current time, try again later"
        const customerRow = result.rows[0]
        
        await pgPool.query(
            "INSERT INTO wallets (customer_id, balance, created_at, updated_at) VALUES ($1, $2, $3, $4)",
            [
                customerRow.id,
                0,
                now,
                now,
            ]
        )

        return customer
    },
    getById: async id => {
        const result = await pgPool.query("SELECT * FROM customers WHERE id = $1", [id])
        if (result.rowCount <= 0) throw "Customer not found"
        return result.rows[0]
    },
    deleteById: async id => {
        const result = await pgPool.query("DELETE FROM customers WHERE id = $1", [id])
        if (result.rowCount <= 0) throw "Customer not found"
        return true
    },
    update: async (id, customer) => {
        if (!customer.name || !customer.phone || !customer.password) throw "Required customer fields missed";

        const now = new Date()

        const result = await pgPool.query(
            "UPDATE customers set name = $1, phone = $2, password = $3, photo = $4, national_id = $5, updated_at = $6 where id = $7;",
            [
                customer.name,
                customer.phone,
                customer.password,
                customer.photo ? customer.photo : null,
                customer.national_id ? customer.national_id : null,
                now,
                id
            ]
        )

        if (result.rowCount <= 0) throw "Customer not found"
        return result.rows[0]
    },
    getList: async (limit, page) => {
        const offset = limit * (page - 1)

        const result = await pgPool.query("SELECT * FROM customers limit $1 offset $2", [limit, offset])

        const countResult = await pgPool.query("SELECT COUNT(id) as count FROM customers")

        return {
            rows: result.rows,
            count: countResult.rows[0].count
        }
    },
    lastCustomers: async (limit) => {
        const result = await pgPool.query("SELECT * FROM customers order by id desc limit $1", [limit])

        return result.rows
    },
    customersCount: async () => {
        const countResult = await pgPool.query("SELECT COUNT(id) as count FROM customers")
        return countResult.rows[0].count
    },
}
