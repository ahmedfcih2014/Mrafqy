import pgPool from "./Connection.js"

export default {
    create: async (service) => {
        if (!service.name || !service.price || !service.icon) throw "Required service fields missed";
        
        const now = new Date()
        const result = await pgPool.query(
            "INSERT INTO services (name, icon, price, brief, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                service.name,
                service.icon,
                service.price,
                service.brief ? service.brief : null,
                now,
                now,
            ]
        )
        
        if (result.rowCount <= 0) throw "Service not created for current time, try again later"
        return result.rows[0]
    },
    getById: async id => {
        const result = await pgPool.query("SELECT * FROM services WHERE id = $1", [id])
        if (result.rowCount <= 0) throw "Service not found"
        return result.rows[0]
    },
    deleteById: async id => {
        const result = await pgPool.query("DELETE FROM services WHERE id = $1", [id])
        if (result.rowCount <= 0) throw "Service not found"
        return true
    },
    update: async (id, service) => {
        if (!service.name || !service.price || !service.icon) throw "Required service fields missed";

        const now = new Date()

        const result = await pgPool.query(
            "UPDATE services set name = $1, icon = $2, price = $3, brief = $4 ,updated_at = $5 where id = $6;",
            [
                service.name,
                service.icon,
                service.price,
                service.brief ? service.brief : null,
                now,
                id
            ]
        )

        if (result.rowCount <= 0) throw "Service not found"
        return result.rows[0]
    },
    getList: async (limit, page) => {
        const offset = limit * (page - 1)

        const result = await pgPool.query("SELECT * FROM services limit $1 offset $2", [limit, offset])

        const countResult = await pgPool.query("SELECT COUNT(id) as count FROM services")

        return {
            rows: result.rows,
            count: countResult.rows[0].count
        }
    },
}
