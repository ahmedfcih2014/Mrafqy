import config from "../config.js"
import sha1 from "../libs/sha1.js"
import pgPool from "./Connection.js"
import moment from "moment/moment.js"

export default {
    adminLogin: async (username, password) => {
        const result = await pgPool.query('SELECT * FROM admins WHERE username = $1 and password = $2', [username, password])
        if (result.rowCount <= 0) throw "Not Found"

        const validTokenTil = moment(new Date).add(config.adminTokenTime, 'minutes').format("YYYY-MM-DD H:mm:ss")
        
        const admin = result.rows[0]
        admin.token = await sha1.sah256(`${admin.id}-${admin.name}-${admin.username}-${Math.random()}`)
        
        await pgPool.query('UPDATE admins SET token = $1, token_valid_til = $2 WHERE id = $3', [admin.token, validTokenTil, admin.id])
        
        return admin
    },
    validToken: async token => {
        const validTokenTil = await moment(new Date).format("YYYY-MM-DD H:mm:ss")
        const result = await pgPool.query('SELECT * FROM admins WHERE token = $1 and token_valid_til >= $2', [token, validTokenTil])

        if (result.rowCount <= 0) throw "Token invalid"
        return true
    },
    create: async (admin) => {
        if (!admin.name || !admin.username || !admin.password) throw "Required admin fields missed";
        
        const now = new Date()
        const result = await pgPool.query(
            "INSERT INTO admins (name, username, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [
                admin.name,
                admin.username,
                admin.password,
                now,
                now,
            ]
        )
        
        if (result.rowCount <= 0) throw "Admin not created for current time, try again later"
        return result.rows[0]
    },
    getById: async id => {
        const result = await pgPool.query("SELECT * FROM admins WHERE id = $1", [id])
        if (result.rowCount <= 0) throw "admin not found"
        return result.rows[0]
    },
    deleteById: async id => {
        const result = await pgPool.query("DELETE FROM admins WHERE id = $1", [id])
        if (result.rowCount <= 0) throw "Admin not found"
        return true
    },
    update: async (id, admin) => {
        if (!admin.name || !admin.username || !admin.password) throw "Required admin fields missed";

        const now = new Date()

        const result = await pgPool.query(
            "UPDATE admins set name = $1, username = $2, password = $3, updated_at = $4 where id = $5;",
            [
                admin.name,
                admin.username,
                admin.password,
                now,
                id
            ]
        )

        if (result.rowCount <= 0) throw "Admin not found"
        return result.rows[0]
    },
    getList: async (limit, page) => {
        const offset = limit * (page - 1)

        const result = await pgPool.query("SELECT id, name, username FROM admins limit $1 offset $2", [limit, offset])

        const countResult = await pgPool.query("SELECT COUNT(id) as count FROM admins")

        return {
            rows: result.rows,
            count: countResult.rows[0].count
        }
    },
}
