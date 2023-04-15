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
}
